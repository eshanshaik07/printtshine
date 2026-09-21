# Merge Services into About

## Goal
Combine the existing About and Services content into one About page, while removing Services as a standalone destination.

## Changes
- Place the existing interactive Services section directly below the About content on `/about`, preserving its cards, expanded details, animations, and links to Works.
- Remove the standalone Services page content and redirect the old `/services` URL to `/about#services` so existing bookmarks do not break.
- Remove the duplicate standalone Services navigation item.
- Update footer service links to open the matching service section on `/about`.
- Keep the Works page and its current “Services” navigation label unchanged.

## Validation
- Confirm `/about` shows About followed by all Services content.
- Confirm `/services` redirects to the Services section on About.
- Check desktop and mobile navigation and footer links.
- Confirm the project builds without errors.
