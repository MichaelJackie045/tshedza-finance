package za.co.tshedza.notify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.BufferedReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Loads backend/.env.notify into the Spring Environment if present
 * (RESEND_API_KEY, NOTIFY_FROM_EMAIL, NOTIFY_OPS_EMAIL).
 */
public class NotifyEnvPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Path file = Path.of(".env.notify");
        if (!Files.isRegularFile(file)) {
            file = Path.of("backend/.env.notify");
        }
        if (!Files.isRegularFile(file)) {
            // Absolute fallback for IDE launches
            file = Path.of(System.getProperty("user.dir"), ".env.notify");
        }
        if (!Files.isRegularFile(file)) {
            return;
        }
        System.out.println("[notify] Loading env from " + file.toAbsolutePath());
        try {
            Map<String, Object> values = new LinkedHashMap<>();
            try (BufferedReader reader = Files.newBufferedReader(file)) {
                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (line.isEmpty() || line.startsWith("#") || !line.contains("=")) {
                        continue;
                    }
                    int eq = line.indexOf('=');
                    String key = line.substring(0, eq).trim();
                    String value = line.substring(eq + 1).trim();
                    if (!value.isEmpty() && environment.getProperty(key) == null) {
                        values.put(key, value);
                    }
                }
            }
            if (!values.isEmpty()) {
                environment.getPropertySources().addFirst(new MapPropertySource("notifyEnvFile", values));
            }
        } catch (Exception ignored) {
            // optional file
        }
    }
}
