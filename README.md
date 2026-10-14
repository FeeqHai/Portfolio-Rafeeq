# Rafeeq's portfolio

A personal portfolio built with React 19, Vite 7, Tailwind CSS 4, and React Router, presenting projects, experience, education, and a resume.

## Local development

Install Node.js 24 (recorded in `.nvmrc`) and npm. From the project folder:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Before submitting changes:

```sh
npm run lint
npm run build
npm run preview
```

Open the preview URL with `/Portfolio-Rafeeq/` appended. Hash routes, such as `/Portfolio-Rafeeq/#/projects`, work on GitHub Pages without server rewrites.

## Guides

- [Project guidelines](docs/PROJECT_GUIDELINES.md): content locations, conventions, review checklist, CI/CD, and enabling publishing later.
- [AI agent instructions](AGENTS.md): scope and verification rules for automated contributors.

## CI/CD

Pull requests to `main` and updates to `main` run **Lint and build** in GitHub Actions. Failed checks prevent the workflow from deploying. To prevent merging failed checks as well, configure the required status check described in the guidelines.

**Publishing is opt-in.** The new workflow deploys only when the repository Actions variable `PORTFOLIO_PAGES_DEPLOY_ENABLED` equals `true`, and only from `main` after checks pass. Leave it absent or `false` until ready to publish. Pull requests never deploy.

The existing `npm run deploy` command is a separate legacy publishing path that bypasses this workflow's checks and enable switch. Do not use it for ordinary development; use the documented Actions release process.
