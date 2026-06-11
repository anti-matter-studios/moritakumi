# Presentation Website Plan

This file is the living project plan for the presentation-support website. Before implementing future work on this project, read this document first and update it when decisions change.

## Project Goal

Build a React website, backed by Bun, that behaves like a full-screen slide deck for a live presentation. Each subject should occupy the whole viewport like a PowerPoint slide, support direct navigation, and leave room for final content to be filled in later.

## Core Constraints

- Use React for the frontend.
- Use Bun for local development, dependency management, and scripts.
- Prefer CSS modules for component styling.
- Use Sass for global styles, CSS modules, design tokens, and reusable mixins.
- Keep global CSS limited to resets, root layout, typography, and theme variables.
- Prepare for deployment to GitHub Pages through GitHub Actions.
- Treat root-level HTML files as Vite page entries for multi-page builds.
- Use green-led theme variants, including a light Anti-Matter Studio moss palette and one dark theme.
- Treat the current existing source code as test code until implementation begins.

## Planned Sections

- Landing page for the presentation opening
- Hobbies
- Travels
- Personality questionnaire
- Curriculum vitae
- Future projects
- Special thanks section at the end

Sections should be composed in JSX pages so final content stays close to its page structure. Shared layout components may derive navigation metadata from slide props.

## Slide Architecture

- The main page should behave as a vertical slide deck.
- Each section should fill the viewport.
- Scrolling should move naturally from one full-screen section to the next.
- Direct section jumps should work from both the navbar and the timeline.
- The active section should be shared across navigation elements.
- Keyboard navigation should be considered for presentation ergonomics:
  - Arrow down or right moves to the next slide.
  - Arrow up or left moves to the previous slide.
  - Home moves to the first slide.
  - End moves to the last slide.

## Reusable Component Plan

### PresentationLayout

Wraps the entire slide experience. It owns the overall layout and renders the navbar, timeline, and slide container.

### Slide

A reusable full-screen section wrapper. It should accept an ID, label or title, optional visual variant, and children.

### Navbar

Displays links for every section and highlights the active section. The navbar should animate out while scrolling down and reappear when scrolling up; persistent slide progress belongs to the timeline.

### Timeline

Renders a left-side timeline with one marker per section. It should visually track progress, highlight the current slide, and let users jump directly to any section.

### SectionLink

Shared link behavior for navbar and timeline items so smooth scrolling, hash behavior, and accessibility are consistent.

### Theme Utilities

Centralize theme variables and any theme switching support. Components should consume CSS variables rather than hardcoded final colors.

## Navigation Behavior

- Use section IDs as stable anchors.
- Use smooth scrolling for navbar and timeline jumps.
- Use `IntersectionObserver` to detect the currently visible section.
- Optionally synchronize the current section with the URL hash.
- Ensure navigation remains usable on desktop and mobile.

## Theming Strategy

Use CSS variables as the theming foundation. CSS modules should reference these variables for component styling.

Initial theme categories:

- Page background
- Surface background
- Primary text
- Muted text
- Accent colors
- Navbar background and active state
- Timeline rail, marker, progress, and active state
- Slide-specific background variants

Current theme variants:

- Green studio
- Green sage
- Green sea
- Green dark

The palette is currently centered on green variations, with `green-studio` and `green-dark` based on the Anti-Matter Studios icon's sage surface, dark moss, ink, and ivory contrast. Implementation should make it easy to revise colors without editing every component.

## CSS Module Strategy

- Use CSS modules for component-specific styles.
- Keep layout rules close to the reusable components that own them.
- Keep global styles minimal and foundational.
- Avoid hardcoding final section colors inside content components.

Expected module areas:

- Presentation layout
- Slide wrapper
- Navbar
- Timeline
- Individual slide content

## Content Strategy

Until final content is ready, create structured placeholder slides rather than final copy.

Suggested placeholders:

- Landing: title, short intro, presentation identity area
- Hobbies: visual zones or placeholder cards
- Travels: map or photo-friendly layout
- Personality questionnaire: question/result-friendly layout
- CV: split-friendly layout for school and work
- Future projects: roadmap or project-card layout
- Special thanks: closing acknowledgement layout

## Deployment Plan

- Use Vite with React unless a stronger project constraint appears.
- Configure the Vite base path for GitHub Pages.
- Add a GitHub Actions workflow that:
  - Sets up Bun
  - Installs dependencies
  - Builds the app
  - Publishes the build output to GitHub Pages
- Prefer static-safe navigation through section anchors and hash-compatible behavior.

## Progress Checklist

- [x] Create root-level project plan file.
- [x] Replace or rebuild the existing test source with a clean React/Bun/Vite structure.
- [x] Add base global styles and theme variables.
- [x] Scaffold core Sass tokens, mixins, global styles, and starter module styles.
- [x] Configure Vite to discover multiple root-level HTML page entries.
- [ ] Build reusable presentation layout components.
- [x] Add initial navbar, brand mark, section link, and section registry components.
- [x] Refactor content out of data arrays into JSX-driven pages.
- [x] Add placeholder slide components.
- [x] Implement active-section detection.
- [x] Implement smooth direct navigation from navbar links.
- [x] Make navbar hide on downward scroll and reappear on upward scroll.
- [x] Add an initial theme variant toggle in the navbar.
- [ ] Add keyboard navigation.
- [ ] Add responsive timeline and navbar behavior.
- [ ] Add GitHub Actions deployment to GitHub Pages.
- [ ] Replace placeholder content with final presentation content.

## Current Implementation Assumptions

- The planning file lives at the repository root as `PRESENTATION_SITE_PLAN.md`.
- This file should be consulted before future project work.
- Existing source code is considered test code and should not constrain the future implementation unless explicitly reused later.
- The first implementation pass should prioritize reusable structure and navigation behavior over final content.
