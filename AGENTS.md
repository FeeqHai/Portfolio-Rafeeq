# Instructions for contributors and AI agents

Read `README.md` and `docs/PROJECT_GUIDELINES.md` before editing.

- Use Node.js 24 and npm with the committed lockfile. Install with `npm ci`.
- Keep changes focused on the requested task. Preserve personal facts, contact details, project claims, and the existing design unless changes are requested.
- Pages live in `src/pages`, reusable UI in `src/components`, and imported images in `src/assets`.
- Preserve Vite's `/Portfolio-Rafeeq/` base and `HashRouter` unless hosting requirements change. Match filename case exactly for Linux CI.
- Follow surrounding JSX/CSS style. Keep hooks unconditional, declare effect dependencies, and clean up listeners, timers, animation frames, and WebGL resources.
- Run `npm run lint` and `npm run build` before submitting. Fix underlying failures instead of broadly disabling checks. Report remaining warnings or blocked verification accurately.
- For visual or navigation changes, also inspect desktop/mobile layouts, keyboard interaction, hash routes, and console errors. Do not claim browser checks unless performed.
- Commit source and lockfile changes when needed, never `node_modules`, `dist`, credentials, or private personal documents. Browser environment variables are public.
- Work on a feature branch and submit a pull request explaining changes and actual validation results.
- Do not merge, enable `PORTFOLIO_PAGES_DEPLOY_ENABLED`, run `npm run deploy`, dispatch a publishing workflow, or change hosting settings without explicit user authorization. Opening a PR is not permission to publish.
