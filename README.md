# Frontend Mentor - Product list with cart

A responsive dessert shop with a working shopping cart, built as a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).

## Table of contents

- [Overview](#overview)
- [Screenshot](#screenshot)
- [Links](#links)
- [My process](#my-process)
- [Run it locally](#run-it-locally)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase or decrease the quantity of an item in the cart
- See an order confirmation modal when they confirm their order
- Reset their selections when they start a new order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements

### Features

- Product grid that switches between one and three columns depending on screen size
- Responsive images that load a different size for mobile, tablet and desktop
- Quantity stepper on each product card, with the card highlighted while the item is in the cart
- Cart panel with line totals, an order total and an empty state
- Order confirmation modal with an itemised summary
- Cart is saved in `localStorage`, so it survives a page refresh

### Screenshot

<img width="945" height="412" alt="Screenshot 2026-10-08 215916" src="https://github.com/user-attachments/assets/50de1a58-1735-440a-96dc-a7805f5dcc19" />


### Links

- Solution URL: https://github.com/osixx-god/dessert-product-cart
- Live site URL: https://dessert-product-cart.vercel.app/

## My process

### Built with

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- Semantic HTML5 markup and Flexbox/Grid layout
- Deployed on [Vercel](https://vercel.com/)

### What I learned

- **Lifting state up.** The cart lives in `App`, and `Desserts`, `Cart` and `Confirmation` each receive only the data and handlers they need as typed props.
- **Derived values instead of extra state.** Item counts and totals are calculated from the cart with `reduce`, so there is only one source of truth.
- **Immutable updates.** Adding, incrementing, decrementing and removing items all use `map` and `filter` to return a new array rather than changing the old one.
- **Identifying products by name instead of array index.** This keeps the handlers consistent and safe if the product list is ever sorted or filtered.
- **Persisting state safely.** Reading from `localStorage` is wrapped in a `try/catch`, because a corrupted value would otherwise crash the app on load.
- **Conditional Tailwind classes.** Choosing between two classes with a ternary, rather than adding a second class on top of one that is always present, avoids conflicts between utilities that set the same property.
- **Static assets in Vite.** Images referenced as plain strings are not bundled, so they need to live in the `public` folder to work on the deployed site.
- **Overlay layout.** The confirmation modal uses a fixed, full-screen backdrop with a flex container that centres the card.

### Continued development

- Add a way to close the confirmation modal with the Escape key and trap focus inside it
- Add tests for the cart logic
- Animate items entering and leaving the cart

## Run it locally

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# create a production build
npm run build
```

## Author

- GitHub - https://github.com/osixx-god
- LinkedIn - https://www.linkedin.com/in/obinna-madu-233095260
- Twitter - @iam_osixx
