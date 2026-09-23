# Add the shopping cart flow

## What will change

- Change **Order Now** in each Works photo popup to add that selected product, quantity, price, and photo to the cart.
- Open a clean confirmation page with a tick animation, **Added to cart**, supporting text, a **View Cart** button, and an **Explore More** button.
- Upgrade the Cart page from its empty state to a real item list showing each product, unit price, quantity controls, item total, and a discard action.
- Keep the current empty-cart screen when no products have been added.
- Add an **Order** button to the populated cart. It will open Contact and prefill the project-details box with each selected item, quantity, and total cost in the requested wording.
- Keep cart contents after page changes and refreshes in the same browser.

## Technical details

- Store only public product details in browser storage and expose them through a shared cart provider.
- Add a dedicated `/cart/added` confirmation route with route-specific metadata.
- Pass the generated order description through the existing Contact URL and initialise the existing form field without changing its database submission flow.
- Preserve the current Works filters, lightbox, pricing, animations, and responsive styling.

## Verification

- Test adding a product, viewing the confirmation, opening the cart, changing quantity, discarding an item, and checking out.
- Confirm the Contact project-details field contains the correct product name, quantity, and cost.
- Check both desktop and mobile layouts, browser refresh persistence, empty-cart behavior, and the latest preview build.