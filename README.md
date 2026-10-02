# Hotel Royal Feast — Food Ordering Demo

A frontend-only demo of a hotel-specific food ordering and delivery platform: customer ordering, checkout, live order tracking, and a hotel admin dashboard. Built with React, Vite, Tailwind CSS and Lucide icons. All data is mock data held in React state (it resets on reload). No backend, database, auth or paid APIs.

## Demo

| Screen | Route |
| --- | --- |
| Customer App | `/#/` |
| Hotel Admin | `/#/admin` |
| Order Tracking | `/#/orders/RF1024` |

The app uses hash routing (`/#/…`), so deep links work on GitHub Pages with no server rewrites.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
```

## Deploy to GitHub Pages

`vite.config.js` sets `base: './'`, so the build works under any repo name.

**Option A: one command**
```bash
npm run deploy   # builds, then publishes dist/ to the gh-pages branch
```
Then in the repo: Settings → Pages → Source: `gh-pages` branch, `/ (root)`.

**Option B: manual**
Build, then publish the contents of `dist/` through any static host or the Pages "deploy from branch" setting.

Your demo will be live at `https://<username>.github.io/<repo>/`.

## Try the full flow

1. Add dishes on `/#/`, open the cart, fill delivery details, and Place Order.
2. On the tracking page, use **Simulate Next Status**, or open **Hotel Admin** (footer) and press Accept → Mark Preparing → Mark Ready → Out for Delivery → Delivered.
3. In Hotel Admin, add, edit, delete or toggle availability of menu items. Changes show up on the customer menu immediately.

## Structure

```
src/
  components/  Layout, ProductCard, Tracker, Badge, Img
  pages/       Home, Cart, Order, Orders, Admin
  data/        menu.js (mock menu and seed orders)
  hooks/       useStore.jsx (cart, orders, menu, toasts)
  App.jsx
```

Food photos load from Unsplash URLs; if one fails, a placeholder shows instead.
