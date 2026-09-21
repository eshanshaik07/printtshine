# Add Product Pricing and Quantity Controls

## Goal
Enhance each existing Works photo popup with product-specific pricing and quantity selection, while keeping the current gallery design.

## Changes
- Assign a reasonable original price and discounted price to every product represented by the four existing portfolio photos.
- Show pricing in the popup as a struck-through original price beside the current discounted price, for example ₹499 and ₹299.
- Add a quantity control with minus, editable number field, and plus controls; prevent quantities below 1.
- Update the displayed total price when quantity changes.
- Remove only the “Contact us” button from the photo popup and keep “Order Now” linked to the existing enquiry flow.
- Pass the selected product, quantity, and total price through the Order Now link without changing the enquiry database.

## Validation
- Open each available photo and confirm its correct price appears.
- Test typing a quantity and using plus/minus controls on desktop and mobile.
- Confirm totals update and Order Now carries the selected details.
- Confirm Contact us is absent from the popup and the project builds successfully.
