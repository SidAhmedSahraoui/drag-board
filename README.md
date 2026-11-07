## DragBoard — a drag & drop task board

A fast, keyboard-friendly Kanban board that saves to your browser. Built with React, TypeScript, dnd-kit, Zustand, Tailwind CSS and Framer Motion.

## Features

- Drag cards between lists, reorder cards, and reorder lists (mouse, touch, or keyboard).
- Inline "add card" / "add list" composers; rename lists from their menu; edit cards in a dialog.
- Undo for deleted cards and lists; Esc cancels a drag and restores the board.
- Accessible: focus-trapped dialogs, labelled controls, screen-reader announcements by title.
- Autosaves to `localStorage` (validated on load, so corrupted data can't crash the app).
- Marketing landing page at `/`, the board at `/board` (`/portfolio` redirects).

## Keyboard

Focus a card or a list's grip handle, then: `Space` pick up / drop, `←` `→` move between lists, `↑` `↓` move within a list, `Esc` cancel.

## Scripts

```bash
yarn dev      # start the dev server
yarn build    # type-check and build
yarn lint     # eslint, zero warnings allowed
```

## Structure

- `src/lib/store` – Zustand store (persisted)
- `src/lib/dnd` – drag & drop behaviour (`useBoardDnd`, keyboard coordinates)
- `src/layouts` – board building blocks (container/list, item/card, menu, modal)
- `src/components` – primitives (button, input, composer, toast, error boundary)
- `src/pages` – `home` (landing), `board`, `error` (404)
