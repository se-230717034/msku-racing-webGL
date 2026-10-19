# MSKU Racing GDevelop source

`game.json` is the editable GDevelop project supplied by the team. The custom Formula Student model is stored under `assets/`.

The production web build lives in `public/game/`. After making a fresh GDevelop HTML5 export, copy the export into that directory and run:

```bash
node scripts/customize-gdevelop-export.mjs
```

This reapplies the MSKU Racing palette, Formula model, Turkish HUD and the lap-time bridge used by the website leaderboard.

