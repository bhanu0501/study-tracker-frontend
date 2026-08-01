# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


Technical Stack Overview – Study Tracker
Here is a summary of the technology stack, architecture, and design used to build the Study Tracker application:

🎨 1. Frontend Tech Stack
Category	Technology / Tool	Description
Framework & Build	React 18 + Vite 8	Modern, component-based UI framework paired with Vite for lightning-fast HMR dev server and optimized production bundling.
Language	JavaScript (ES6+)	Modern client-side JS using Hooks, async/await, custom hooks, and functional components.
Styling & Design	Vanilla CSS3 (Design Tokens)	Custom CSS architecture built using CSS Custom Properties (var(--...)) for full design control without generic framework constraints.
Theme Engine	Dynamic CSS Variables	Supports Light Mode, Dark Mode, and System Mode (auto-syncs with OS preferences via matchMedia).
Customization	Accent & Font Engine	Real-time accent color switching (Blue, Green, Purple, Orange, Red) and font scaling (Small, Medium, Large) with zero page reloads.
Component Architecture	Modular React Components	- Layout: Sidebar (with bottom settings footer), Header, Layout
- Activities: ActivityTable (with quick-edit inline status badge dropdowns), ActivityFilters, ActivityForm, StatusBadge
- Dashboard: DashboardCards, SummaryCard
- Settings: SettingsPage
- Custom Hooks: useActivities, useSettings
API Proxy	Vite Dev Server Proxy	Configured /api proxy routing directly to the Spring Boot backend (http://localhost:8080).
