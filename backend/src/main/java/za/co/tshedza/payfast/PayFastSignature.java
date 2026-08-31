package za.co.tshedza.payfast;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * PayFast custom-integration signatures (attribute order, not alphabetical API style).
 * Encoding: spaces as '+', percent-hex in UPPERCASE — matches PHP urlencode().
 */
public final class PayFastSignature {

    private PayFastSignature() {}

    public static String generate(LinkedHashMap<String, String> fields, String passphrase) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> e : fields.entrySet()) {
            if ("signature".equals(e.getKey())) {
                continue;
            }
            String val = e.getValue();
            if (val == null || val.isBlank()) {
                continue;
            }
            if (sb.length() > 0) {
                sb.append('&');
            }
            sb.append(e.getKey()).append('=').append(pfEncode(val.trim()));
        }
        if (passphrase != null && !passphrase.isBlank()) {
            sb.append("&passphrase=").append(pfEncode(passphrase.trim()));
        }
        return md5Hex(sb.toString());
    }

    /**
     * ITN signature: use posted field order up to (excluding) signature, then passphrase.
     */
    public static String generateFromPostedOrder(Map<String, String> posted, String passphrase) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> e : posted.entrySet()) {
            if ("signature".equals(e.getKey())) {
                break;
            }
            String val = e.getValue() == null ? "" : e.getValue();
            if (sb.length() > 0) {
                sb.append('&');
            }
            sb.append(e.getKey()).append('=').append(pfEncode(val));
        }
        if (passphrase != null && !passphrase.isBlank()) {
            sb.append("&passphrase=").append(pfEncode(passphrase.trim()));
        }
        return md5Hex(sb.toString());
    }

    /** PHP urlencode-compatible encoding for PayFast. */
    public static String pfEncode(String value) {
        String encoded = URLEncoder.encode(value, StandardCharsets.UTF_8)
                .replace("+", "%20")
                .replace("*", "%2A")
                .replace("%7E", "~");
        // Uppercase percent-hex, then spaces as '+'
        StringBuilder out = new StringBuilder(encoded.length());
        for (int i = 0; i < encoded.length(); i++) {
            char c = encoded.charAt(i);
            if (c == '%' && i + 2 < encoded.length()) {
                out.append('%');
                out.append(Character.toUpperCase(encoded.charAt(i + 1)));
                out.append(Character.toUpperCase(encoded.charAt(i + 2)));
                i += 2;
            } else if (c == ' ') {
                out.append('+');
            } else {
                out.append(c);
            }
        }
        return out.toString().replace("%20", "+");
    }

    private static String md5Hex(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder(digest.length * 2);
            for (byte b : digest) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("MD5 not available", e);
        }
    }
}
