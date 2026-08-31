# Design System: Tshedza Finance

## Why this direction

Payday sites shout. Bank sites freeze people out. This product has to sit in the middle: a person on a phone, about to hand over an ID and a payslip, who needs to see the repayment in rand first.

Tshedza is a Tshivenda word related to light. The design job is to make the cost visible — not to look like a fintech deck.

## Colour

- **Teal** `#0F4C4A` — header, wordmark, links, quote slider track.
- **Marigold** `#E8A33D` — Apply, Continue, selected term, progress. The one action colour.
- **Paper** `#F7F5F0` — page background.
- **White** `#FFFFFF` — quote panel, forms, account chrome.
- **Ink** `#1C2321` — text.
- **Muted** `#5A635F` — supporting text.
- **Line** `#DDD8CE` — structure, not decoration.
- **Sage** `#4C7A64` — paid, verified, approved. Status only.
- **Rust** `#B34B3C` — errors, overdue. Status only.

Marigold is for the thing you press next. Teal is the institution.

## Type

- **Wordmark only:** Source Serif 4. Newspapers put the masthead in serif and the rest in sans. Same idea.
- **Everything else:** Source Sans 3. Chosen because it stays legible at 16px+ on a cheap Android, which is where most of this will be read.
- **Money:** same family, tabular lining figures. A third “data” font makes digits feel like a demo.

Scale:
- Page title: 28–32px, sans semibold
- Monthly amount in the quote: 32px, the largest type on the page on purpose
- Body: 17px
- Supporting: 15px
- Labels sit above fields, never inside them, at body size so iOS does not zoom

## Layout

Teal header, marigold Apply. Dark full-bleed heroes and stripe overlays do not help someone compare R5,000 over 3 months vs 6.

The quote is the signature: amount (slider *and* a number field), term as a radio group, then “You would pay R… a month” with borrowed / interest / total underneath. Interest in rand, not only a rate.

Application steps are a sentence (“Step 2 of 5”) plus a text list with `aria-current`. Numbered circles filled in gold are decoration. Continue stays in a sticky bar at the bottom of the thumb zone.

Product pages are a list with a fact on the right, not four identical cards. Cash loan is the main product; debt review is labelled “Not a loan” and visually a notice, not an application clone.

Dashboard leads with the next payment — date and amount — because that is why someone opened the account.

## Motion

Ledger figures ease when the amount changes. Respect `prefers-reduced-motion` and skip the count. Progress bars may ease. No hover lift on cards. No page-load animation.

## Accessibility (non-negotiable here)

- Skip link to main content
- 44px minimum tap targets
- Visible focus ring (2px marigold, 3px offset)
- Labels associated with controls; errors use `aria-invalid` and `role="alert"`
- Autocomplete on name, phone, email
- Dates in en-ZA (`1 Sep 2026`), money in `en-ZA` rand
- Live region on the quote so the monthly figure is announced
