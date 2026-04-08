# Prompt & Process Guide: Tobarrak Law Chamber Clone

This document contains the prompts and the technical logic used to create this clone. You can reuse these to replicate the design or generate similar assets for future projects.

## 🎨 Image Generation Prompts

### 1. Hero Background (Gavel)
**Used for:** `assets/hero-bg.png`
> **Prompt:** Professional law firm hero banner background: a dramatic close-up of a golden brass judge's gavel resting on a dark wooden surface, with a dark moody background showing blurred law books on shelves. Rich golden tones, dramatic side lighting, shallow depth of field, cinematic look. Dark charcoal and gold color palette. Professional legal photography style. High resolution.

### 2. Barrister Portrait
**Used for:** `assets/barrister.png`
> **Prompt:** Professional headshot portrait of a South Asian male barrister in his mid-30s, wearing a white formal shirt, looking confident and professional. Dark background with blurred law books on shelves. Warm studio lighting, high-end corporate photography style. Professional and authoritative expression. High resolution.

---

## 🛠️ Design System (CSS)

The design follows a "Modern Legal" aesthetic. Here are the key design tokens used in `css/style.css`:

- **Primary Background:** `#1a1a1a` (Deep Charcoal)
- **Secondary Background/Cards:** `#222222`
- **Accent Color (Gold):** `#c5a059`
- **Typography:**
    - **Headings:** `'Playfair Display', serif` (For an authoritative, classic legal feel)
    - **Body Text:** `'Outfit', sans-serif` (For modern readability)
- **Sticky Header:** Sticky white background with a subtle shadow (`rgba(0,0,0,0.1)`) that intensifies on scroll.

---

## 📂 Process Workflow

1. **Analysis:** Used a browser agent to extract the DOM, text content, and visual hierarchy from the original site.
2. **Asset Generation:** Used the AI image tool with the specific prompts above to create high-quality, legally-themed visuals.
3. **Template Setup:** Created a modular CSS design system to ensure consistency across all 5 pages.
4. **Interactivity:** Implemented a lightweight `js/main.js` for:
    - Sticky header transitions.
    - Mobile menu (hamburger) toggle.
    - Scroll-triggered animations via `IntersectionObserver`.
5. **Multi-page Logic:** Built individual HTML files (`index`, `associates`, `practices`, `case-client-successes`, `contact-us`) to ensure it works purely as a static "raw HTML" template.

---

## 🚀 How to Reuse
To create another similar site, you can copy the `css/style.css` and use the same image prompts while changing the "Subject" (e.g., change "South Asian male barrister" to "medical professional" for a clinic site).
