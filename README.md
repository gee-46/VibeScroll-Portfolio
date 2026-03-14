# 🎬 Vibe Coding Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?logo=framer)
![License](https://img.shields.io/badge/Status-Experimental-purple)

A cinematic **scrollytelling personal portfolio** built using **Next.js, Canvas, and Framer Motion**.

This project was created as a **vibe coding experiment** — a creative break to explore modern web interactions, cinematic scrolling experiences, and interactive UI design.

---

# 🌐 Live Demo

> (Coming soon)
> 
---

# 📸 Preview

![Project Preview](preview.gif)

*(You can record a short screen capture of the scrolling animation and add it here)*

---

# ✨ Features

🚀 Canvas-based **scroll animation using image sequences**  
🎬 Cinematic **scrollytelling portfolio experience**  
⚡ Smooth **Framer Motion animations**  
📜 Scroll-linked **frame-by-frame animation**  
🌌 Modern **dark UI with glassmorphism cards**  
📱 Fully **responsive design**  
🎯 Performance optimized with **image preloading**

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|--------|
| Next.js 14 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| HTML5 Canvas | Image sequence rendering |

---

# ⚙️ How It Works

The core mechanic is a **scroll-driven animation system**.

1️⃣ A sequence of **WebP frames** is stored in `/public/sequence/`.

2️⃣ All frames are **preloaded on page load** to prevent flickering.

3️⃣ The user's **scroll progress (0 → 1)** is tracked using `useScroll`.

4️⃣ Scroll progress is mapped to the **frame index**.

5️⃣ The corresponding frame is drawn to **HTML5 Canvas**.

6️⃣ Text overlays animate with **parallax effects**.

This technique is similar to animations used in **Apple product pages and Awwwards websites**.

---

# 📂 Project Structure

