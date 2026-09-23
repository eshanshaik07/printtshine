# Fix scrolling and spotlight the cart

## Changes
- Replace competing page-scroll locks with one shared, reliable lock so preloaders and overlays always restore scrolling correctly.
- Lock scrolling while the mobile menu is open and restore it when the menu closes or navigation changes.
- Give both desktop and mobile cart buttons a prominent animated ring and subtle pulse that remain clear in light and dark themes.
- Preserve the current cart count badge, navigation layout, links, and cart behavior.

## Verification
- Check scrolling after the opening preloader, page navigation, mobile menu open/close, and product preview open/close.
- Confirm the cart remains visually prominent without shifting nearby navigation controls.
- Verify desktop and mobile layouts and the latest preview build.
