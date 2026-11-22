# One Choice Official

An online store for sneakers and streetwear, with a filterable catalogue, a cart that persists between visits and a multi-step checkout.

## Overview

This is a front-end prototype of an online store for One Choice Official, a sneaker and streetwear shop. It was designed and built by Art Halimi. It covers the whole shopping flow: browsing and filtering the catalogue, viewing a product, managing the cart and checking out with cash on delivery. The UI copy is in Albanian. Product data is mock data in the client and there is no backend yet, so orders are not sent anywhere.

## Features

- **Home page**: a hero that shifts and tilts slightly as the mouse moves, an endlessly scrolling row of brand names, gender category cards, a featured collection and an editorial banner.
- **Catalogue**: filter by category, gender and brand, and sort by price or newest. Filters are read from URL query parameters (`?category=`, `?gender=`, `?tag=new|sale`), so every navbar link opens a pre-filtered view. Products animate in and out as the filters change.
- **Product page** (`/product/:id`, currently shows sample data): thumbnails, a zoom that follows the cursor, a fullscreen lightbox and a wishlist toggle. Visitors must pick a size before they can add to cart, and related products are shown below.
- **Persistent cart**: items are stored in `localStorage` and keyed by product and size. The cart has quantity controls and removal, and shows the subtotal and shipping (free over $200, otherwise $10).
- **Three-step checkout**: information, payment and confirmation, with slide transitions that follow the direction of travel. Every field is validated, including the email format, and payment is cash on delivery. The confirmation shows a generated order reference and the cart is cleared.
- **Responsive navbar**: transparent until the page scrolls, then solid. It shows a live cart count, and the animated mobile menu closes when the route changes.
- **Cut-corner visual style**: the clipped corners on cards, images and buttons are drawn with CSS `clip-path`, and an SVG outline traces exactly the same shape.

## Tech stack

- React 19 and Vite 7
- React Router 7
- Tailwind CSS 4 (through `@tailwindcss/postcss`)
- Framer Motion 12
- Lucide React icons
- ESLint 9 (flat config)

## Technical highlights

- **Cart state**: [`src/context/CartContext.jsx`](src/context/CartContext.jsx) holds the cart in React Context with a `useCart` hook, which throws if it is used outside the provider. The cart loads once from `localStorage` (protected by `try/catch`) and is saved on every change. Adding the same product and size again increases the quantity instead of adding a duplicate line. Item count, subtotal, shipping and total are memoised values, and the actions are stable callbacks.
- **Filters driven by the URL**: [`src/pages/Collection.jsx`](src/pages/Collection.jsx) reads its starting filters from the query string and resets them whenever the query string changes, so the navbar links act as deep links. The brand list is built from the product data. The grid uses Framer Motion `layout` with `AnimatePresence` to animate products in and out.
- **Mouse parallax without re-renders**: [`src/components/Hero.jsx`](src/components/Hero.jsx) passes the cursor position through `useMotionValue`, `useSpring` and `useTransform`. The background and the headline move in opposite directions and the background tilts slightly in 3D, all without React state updates.
- **Checkout steps**: [`src/pages/Checkout.jsx`](src/pages/Checkout.jsx) runs the three steps with variants that know which direction the user is moving. Each field has its own validation message, and it clears as soon as that field is edited.
- **Clip-path outlines**: [`src/components/ProductCard.jsx`](src/components/ProductCard.jsx) uses an SVG path with `vector-effect: non-scaling-stroke` to draw the outline exactly along the clipped edge at any size.

## Getting started

**Prerequisites:** Node.js `^20.19.0` or `>=22.12.0` (what Vite 7 requires), and npm.

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

No environment variables are needed. On Netlify, [`public/_redirects`](public/_redirects) sends every path to `index.html`, so client-side routes still work when someone opens or reloads a deep link.

## Project structure

```
public/
  _redirects          # SPA fallback for Netlify
src/
  assets/             # hero, banner and category imagery
  components/         # Navbar, Hero, TrendingMarquee, Categories, ProductCard, Footer, ...
  context/
    CartContext.jsx   # cart state, persistence and totals
  pages/              # Home, Collection, ProductDetail, Cart, Checkout
  App.jsx             # router and routes
  main.jsx            # entry point
```

## Author

Designed and built by [Art Halimi](https://arthalimi.com) · [GitHub](https://github.com/ArtHalimi7)
