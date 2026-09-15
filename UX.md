# UX Decisions

## Product Goal

The website should make it easy for customers to browse the restaurant menu and place an order while keeping the experience simple, fast, and natural.

The experience should feel like using a real Egyptian restaurant website, not a generic e-commerce store.

## Core Principles

- Arabic-first
- RTL
- Mobile-first
- Primary mobile reference: 390×844
- Responsive testing: 360×800, 390×844, 412×915, tablet, desktop
- Menu and ordering are the center of the experience
- Supporting sections stay lightweight
- Avoid unnecessary features and complexity
- Restaurant content should remain configurable

## Homepage

Current section order:

Navbar
→ Hero
→ Menu
→ About
→ Reviews
→ Location / Contact
→ Footer

The Hero is intentionally compact and guides the user toward the Menu.

The homepage serves both:

- new visitors who want basic restaurant information and social proof
- returning visitors who mainly want to reach the Menu quickly

The navigation provides links to the main homepage sections, with a mobile menu for smaller screens.

## Menu

The Menu is the main part of the website.

The current menu contains the restaurant's configured categories and items from `src/data/menu.ts`.

Current categories:

- كريب الدجاج
- كريب اللحوم والأجبان
- كريب السي فود
- كريب الحلو
- سندوتشات الفراخ
- تشيكن برجر
- بيف برجر
- سماش برجر
- وجبات السي فود
- سندوتشات السي فود
- باستا ميلانو
- قسم البطاطس
- قسم الحرش
- وجبات الحرش
- قسم المشروبات
- وجبات اللحوم والدجاج

A horizontal category selector lets the customer choose a category. The selected category filters the visible menu items to that category.

The menu uses progressive item visibility. It initially shows a limited number of items and allows the customer to reveal more items in stages until the full category is available.

Each item can show:

- image
- name
- short description when available
- price or multiple price options
- availability
- quantity controls

Available items can be added directly from their card.

Items with multiple price options keep quantities independent for each selected option. For example, different sizes/options of the same item can be present in the cart with different quantities.

Images can be opened in a larger view from the item card.

## Cart

The Cart is an overlay-based checkout entry point that keeps the customer on the current page while showing the current order.

The cart clearly shows:

- selected items
- selected options when applicable
- quantities
- item prices
- total
- quantity increase/decrease controls
- clear-cart action

The cart becomes available once the customer has added an item.

The customer can continue from the cart to the checkout flow.

## Ordering Flow

Menu
→ Add item
→ Cart
→ Customer Details
→ Final Review
→ WhatsApp

The customer can return to the previous step and edit the order before the final WhatsApp handoff.

Customer details currently include:

- name
- mobile number
- fulfillment method: delivery or pickup from the restaurant
- delivery address when delivery is selected
- optional current-location link when delivery is selected
- optional notes

No account, login, online payment, or unnecessary customer data is required.

## Final Review

The checkout includes a final review step before opening WhatsApp.

Its purpose is to let the customer verify the order and customer information before leaving the website.

The review shows:

- customer information
- fulfillment method
- delivery address when applicable
- location status when provided
- notes when provided
- ordered items
- selected options
- quantities
- prices
- total

The customer can go back to edit the details or confirm the order handoff.

## WhatsApp

The website prepares an Arabic WhatsApp message containing the order and customer information.

After the customer confirms the review, the website opens WhatsApp with the prepared message.

The customer manually presses Send in WhatsApp.

The website does not claim that the restaurant accepted or confirmed the order. There is currently no backend order persistence or order-tracking system.

## Supporting Sections

### About

The About section is intentionally simple and supportive. It presents the restaurant identity, a short description, and the configured Facebook link without adding unnecessary content.

### Reviews

Reviews are configurable restaurant content and are displayed as social proof within the homepage.

Demo or placeholder reviews may be used during development, but they should be replaced with real customer review data supplied or approved by the restaurant before final client launch.

### Location / Contact

The Location section provides practical restaurant information and contact actions when the corresponding data is available.

It can include:

- address/location
- map action
- opening hours
- phone number
- WhatsApp contact

### Footer

The Footer remains simple and uses configurable restaurant name and tagline information.

## Responsive Direction

Mobile and desktop share the same product logic while adapting the layout to the available space.

### Mobile

Prioritize:

- fast access to the Menu
- compact menu cards
- comfortable touch targets
- easy quantity changes
- accessible cart overlay
- simple checkout steps

### Desktop

Use the available space to improve:

- menu presentation
- category navigation
- cart and checkout readability
- overall breathing room

The desktop layout should not simply be a stretched version of the mobile layout.

## Current Implementation Status

The following UX decisions are already implemented and should be treated as current behavior rather than open design questions:

- compact Hero layout
- horizontal menu category selector
- category-based menu filtering
- progressive menu item visibility
- item price options
- independent quantities per item option
- image enlargement from menu cards
- cart overlay
- multi-step checkout
- delivery/pickup selection
- optional delivery location link
- final order review
- WhatsApp handoff with a prepared order message
- configurable restaurant content and reviews

## Intentionally Out of Scope

The current project is a frontend restaurant ordering website. The following are not part of the current scope unless explicitly requested later:

- backend/database order persistence
- customer accounts or login
- online payment processing
- admin dashboard
- order tracking system
- analytics platform
- unnecessary third-party services

## Development Philosophy

Keep changes focused and validate real user behavior through small, understandable steps.

Prefer working from the current implementation and real restaurant data rather than maintaining documentation that describes an older or hypothetical design.

A typical validation slice should follow:

real data
→ visible UI
→ real interaction
→ state change
→ validation