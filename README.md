# CoursesCodes — Enterprise Modular Frontend Edition 🚀

This repository is a heavily optimized, production-ready fork of the original CoursesCodes project from IAU Course Experience.

🔗 **Upstream Project:** Original Repository: [IAUCourseExp/CoursesCodes](https://github.com/IAUCourseExp/CoursesCodes) 

---

## ⚡ The Core Refactoring (Before vs. After)

### Original Project Issues
* ❌ **Monolithic Architecture:** Entire application (HTML, CSS, JavaScript) crammed into a single `index.html` file (~2000+ lines).
* ❌ **Light Mode Bug:** Course names were not clearly visible in light mode due to poor contrast and styling issues.
* ❌ **Performance Issues:** Slow rendering and filtering; animations causing lag on search operations.
* ❌ **Limited Maintainability:** Difficult to add new features, fix bugs, or extend functionality.

### This Fork's Solutions
* ✅ **Modular Architecture:** Completely decoupled codebase into isolated, reusable ES6+ modules.
* ✅ **Fixed Light Mode:** Proper contrast, readable text, and smooth theme transitions.
* ✅ **Performance Optimized:** Animations only on initial load, efficient state management, reduced DOM manipulation.
* ✅ **Enhanced Maintainability:** Clear separation of concerns (UI, state, logic, styles).
* ✅ **New Features:**
  * Professional dark/light theme switching.
  * Toast notifications and better UX.

> 💡 **Note to Maintainers:** This modernization drastically reduces technical debt, improves rendering performance, and scales development. It has been built specifically to be merged back into the upstream repository via a Pull Request.

---

## 🎯 Key Features

### ✨ Multi-Course Selection & URL-Based Sharing
* **Checkbox Selection:** Select multiple courses at once with a clean, intuitive checkbox interface.
* **URL-Based Sharing:** Share selected courses via a shareable link (e.g., `?courses=CE402,ENG101,MATH201`).
* **Auto-Load on Visit:** When someone opens a shared link, courses are automatically selected and displayed.
* **Cross-Platform Support:** Works seamlessly on desktop and mobile devices.

### 📤 Professional Export Capabilities
* **Excel Export (.xlsx):** Export filtered courses to professional Excel spreadsheets.
* **PDF Export:** Generate print-ready PDF documents with styling.
* **Dynamic Data Parsing:** Exports respect current search filters and selections.

### 🎨 Modern UI/UX
* **Dark/Light Theme Toggle:** Seamless theme switching with persistent user preference.
* **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
* **Toast Notifications:** Non-intrusive, auto-dismissing alerts for user feedback.
* **Smooth Animations:** Performance-optimized entrance animations only on initial load.

### 🔍 Advanced Search & Filter
* **Real-Time Search:** Instant course name and code matching.
* **Department/Category Filter:** Multi-category filtering with dropdown selector.
* **Combined Filters:** Search and department filters work together seamlessly.

---

## 🛠️ Summary of Architectural Enhancements

By splitting the monolithic codebase, this edition introduces a robust framework for academic data management:

* **Separation of Concerns:** Isolated markup (`index.html`), application state (`core/state.js`), styling variables (`css/variables.css`), and functional utilities.
* **Centralized State Machine (`state.js`):** Enforced a single source of truth for UI reactive updates. Live-search queries, multi-criteria filters, course selections, and custom sorting now mutate a shared state, eliminating race conditions or DOM sync bugs.
* **Performance-Optimized Render Pipeline (`render.js`):** Replaced legacy DOM manipulation blocks with clean, asynchronous template literal injections. Subsequent renders skip initial load animations for snappier performance.
* **Professional Exporting Modules:** Dynamically parses reactive JSON-driven grid data directly into professional spreadsheet Excel matrices or fully styled PDF documents locally on the client-side.
* **URL-Based Sharing System (`export/share.js`):** Encodes selected courses into shareable URLs with automatic course loading on page visit. Supports Web Share API on mobile devices with clipboard fallback on desktop.
* **Next-Gen UI/UX Layout System:** Handles dynamic client-side theme switching via centralized CSS variables. Built custom programmatic toast notifications (`toast.js`) and modern overlay modals (`modal.js`) for deep course exploration.

---

## 📂 Revamped Project Directory Structure

```text
CoursesCodes/
├── assets/
│   ├── css/
│   │   ├── animations.css      # UI micro-interactions & keyframe transitions
│   │   ├── components.css      # Modular elements (cards, forms, buttons)
│   │   ├── layout.css          # Page shell framework and alignment grids
│   │   ├── reset.css           # Unified cross-browser layout baseline
│   │   ├── share-styles.css    # Custom checkbox & share menu styling
│   │   ├── theme.css           # Reactive dark/light UI layers
│   │   └── variables.css       # Custom color tokens & design systems
│   ├── data/
│   │   └── courses.json        # Decoupled flat-file JSON local database
│   └── js/
│       ├── core/
│       │   ├── render.js       # Modern DOM template rendering engine
│       │   ├── search.js       # Instant query-matching search logic
│       │   └── state.js        # Centralized global application state manager
│       ├── export/
│       │   ├── excel.js        # Pure JS data-to-spreadsheet exporting engine
│       │   ├── pdf.js          # Semantic document design & printer engine
│       │   └── share.js        # URL encoding & sharing functionality
│       ├── ui/
│       │   ├── theme.js        # Dark/Light theme toggle context handler
│       │   └── toast.js        # Transient system alert and toast notices
│       ├── app.js              # Application entry point & bootstrapper
│       └── dataLoader.js       # Asynchronous JSON stream fetch handler
├── index.html                  # Minimal, clean single-page presentation layout
└── README.md
