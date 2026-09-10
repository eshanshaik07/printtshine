# Update PrintShine footer and branding

## What will change
- Replace the outdated studio description with “Ideas Made. Brands Elevated.” and the new PrintShine description in the footer and page metadata.
- Rebuild only the footer into the requested clean multi-column structure for Company, Services, Works, and Get In Touch.
- Link Home, About, Services, Work, and Contact items to their existing pages.
- Add stable anchors to each existing service card so footer links open the exact service heading and description.
- Add work and contact anchors, plus a compact Help Center destination within the existing contact area rather than creating another page.
- Add Instagram and WhatsApp using the confirmed existing account/contact details. Show Facebook and LinkedIn without invented profile URLs until real URLs are supplied.
- Add subtle theme-aware transitions and a responsive mobile/tablet/desktop layout.

## Technical details
- Use TanStack Router links with URL hashes for cross-page section navigation.
- Add a small hash-scroll handler so navigation lands correctly after route changes and accounts for the fixed navigation bar.
- Keep all current design tokens, fonts, colors, animations, and section layouts.
- Verify each footer destination in the live preview at desktop and mobile widths, then check current build and runtime logs.
