# Add Works Portfolio Filters and Preview

## Changes
- Update only the existing Works / Previous Works section.
- Add Corporate Gifting and Print Solutions as the two main portfolio groups.
- Add every requested product filter under its matching group, preserving the supplied names and order.
- Categorize existing portfolio assets only where the pictured product genuinely matches; one multi-product image may support several relevant filters without appearing more than once in “All”.
- Show a restrained empty state when no genuine existing image is available, rather than inventing or duplicating portfolio work.
- Replace the card flip interaction with a premium lightbox using the selected image as both the centered artwork and blurred backdrop.
- Show the selected product name and existing-style “Start Customizing” and “Order Now” actions, both linking to the existing Contact section.

## Technical Details
- Keep all data, filtering, modal state, keyboard Escape handling, scroll locking, animations, and accessibility within the existing Works section file.
- Reuse semantic theme tokens, typography, spacing, cards, hover motion, and the existing animated button component.
- Do not change the Contact form or backend; include the product in the Contact URL only, since the current form does not expose a product-prefill interface.

## Verification
- Check group and product filtering, image opening/closing, product label, both Contact links, keyboard behavior, and scroll locking.
- Verify desktop and mobile layouts and confirm the project builds without errors.
