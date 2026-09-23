---
name: Wouter layout routing
description: Non-obvious routing constraint for the shared public layout.
---

Shared public pages must be rendered inside a catch-all Wouter `Route` that contains the nested page `Switch`. In this project, making the layout wrapper an exact `/` route causes article, notification, and other secondary routes to render an empty page while the home route still works.

**Why:** The first responsive route check exposed that the exact wrapper matched only the homepage, so the failure was silent and looked like a blank preview rather than a routing error.

**How to apply:** When adding public pages, preserve the catch-all layout wrapper and keep the route-specific pages inside its nested `Switch`; validate at least one non-home public URL after routing changes.