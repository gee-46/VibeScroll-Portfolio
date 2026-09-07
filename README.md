# 🎬 my-portfolio

A cinematic **scrollytelling developer portfolio** built with Next.js, Canvas, and modern web animation techniques — designed to feel like a premium product site rather than a typical resume page.

**[View Live Demo →](https://vibe-scroll-portfolio.vercel.app/)**

---


## ✨ Features
 
| Feature | Description |
|---|---|
| 🎥 Scroll-driven canvas animation | Image-sequence rendering synced to scroll position |
| ⚡ Smooth scrolling | Powered by Lenis for a buttery, physics-based feel |
| 🖱️ Custom cursor | Glowing, magnetic cursor interactions |
| 🧠 Animated background | Futuristic, AI-inspired interactive backdrop |
| 💎 Glassmorphism UI | Neon-accented glass panels throughout |
| 🧩 Modular architecture | Clean, scalable component structure |
| 📱 Fully responsive | Optimized for desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

**Core**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer)

**Rendering & Interaction**

![HTML5 Canvas](https://img.shields.io/badge/Canvas-Animation-orange?style=for-the-badge&logo=html5)
![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-purple?style=for-the-badge)
![Custom Cursor](https://img.shields.io/badge/Custom%20Cursor-Interactive-green?style=for-the-badge)

---

## 📂 Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   │
│   └── components/
│       ├── Navbar.tsx          # Navigation component
│       ├── About.tsx           # About section
│       ├── Experience.tsx      # Experience section
│       ├── Skills.tsx          # Skills showcase
│       ├── Projects.tsx        # Projects portfolio
│       ├── Activities.tsx      # Activities section
│       ├── Contact.tsx         # Contact section
│       ├── Cursor.tsx          # Custom cursor
│       ├── Magnetic.tsx        # Magnetic interaction
│       ├── GlowCard.tsx        # Glowing card component
│       └── InteractiveBackground.tsx  # AI-inspired background
│
├── public/
│   ├── about/                  # About section assets
│   ├── projects/               # Project images & assets
│   └── sequence/               # Canvas animation frames
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gee-46/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 How It Works

The portfolio uses a sophisticated scroll-driven animation system:

1. **Frame Loading** — Image frames are loaded from `/public/sequence/`
2. **Scroll Tracking** — Scroll progress is tracked using Framer Motion
3. **Frame Mapping** — Scroll position is mapped to a frame index
4. **Canvas Rendering** — Frames are rendered on an HTML5 Canvas
5. **Content Animation** — Overlay content animates in sync with scroll

This produces a cinematic storytelling experience similar to premium product sites like Apple and Nike.

---

## 🤖 Tools & Inspiration

- **Antigravity** — UI/UX exploration
- **Gemini Pro** — Code optimization and ideation
- **Google Whisk** — Design inspiration and asset generation

These tools supported ideation, UI structuring, and prompt engineering throughout the build.

---

## 🎯 Purpose

This project was built as a creative exploration to:

- ✨ Experiment with advanced frontend interactions
- 🎞️ Explore scrollytelling techniques
- 🌌 Design futuristic, AI-inspired interfaces
- 📚 Showcase modern web development capabilities

---

## 🧑‍💻 Author

**Gautam N Chipkar**
AI & Data Science Engineering Student | SGBIT

[![GitHub](https://img.shields.io/badge/GitHub-gee--46-black?style=for-the-badge&logo=github)](https://github.com/gee-46)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gautam%20Chipkar-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/gautam-n-chipkar/)

---

## ⭐ Show Your Support

If you found this project interesting:

- ⭐ **Star** the repository
- 🍴 **Fork** it for your own use
- 💡 **Use** it as inspiration for your projects
- 📢 **Share** it with the community

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <b>Gautam N Chipkar</b></p>
