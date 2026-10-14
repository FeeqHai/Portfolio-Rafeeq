# Project guidelines

## Purpose and architecture

This is Rafeeq's personal portfolio: a static React application built with Vite and styled with Tailwind CSS. GitHub Pages serves the production `dist` output. There is no backend in this repository.

| Location | Purpose |
| --- | --- |
| `src/pages/Home.jsx` | Landing page |
| `src/pages/About.jsx` | Personal introduction |
| `src/pages/Academic.jsx` | Education and achievements |
| `src/pages/Projects.jsx` | Project content |
| `src/pages/Experience.jsx` | Work experience |
| `src/pages/Resume.jsx` | Resume presentation |
| `src/components/` | Shared layout, navigation, cards, and effects |
| `src/assets/` | Images imported by components |
| `src/index.css` | Global styles |
| `src/App.jsx` | Route definitions |
| `src/main.jsx` | React entry point and hash routing |
| `vite.config.js` | Build configuration and Pages base path |
| `.github/workflows/static.yml` | CI checks and opt-in deployment |

## Everyday update process

1. Start from the latest `main` and create a descriptive branch such as `feat/update-projects`.
2. Install dependencies with `npm ci`, then run `npm run dev`.
3. Edit the relevant page or component. Keep changes small enough to review.
4. Run `npm run lint` and `npm run build`. For UI changes, use `npm run preview` and inspect the production build too.
5. Push the branch and open a pull request (a proposed change for review).
6. Read **Lint and build** in the PR's Checks tab. If it fails, inspect the failed step, fix the problem, and push again.
7. Review the appearance and content before merging (accepting the change into `main`). Publishing remains disabled until explicitly enabled below.

Example AI request: "Update the Projects page with the details I provide. Follow AGENTS.md, run lint and build, check the mobile layout, and open a pull request. Do not merge or publish."

## Content and code conventions

### Updating the resume

`src/pages/Resume.jsx` uses `src/assets/Mohamad_Rafeeq_Haiqal_Resume.pdf` for both Open PDF and Download PDF. The scrollable preview is `src/assets/resume-preview.webp`, rendered from that same PDF so it works without a browser PDF plugin, including on mobile. When replacing the PDF, regenerate the preview from the new document, check every page (add more preview pages if the document grows), and update the page count, image dimensions, and displayed update date. Preserve the original PDF bytes. Verify zoom, scrolling, opening, and downloading before submitting.

- Preserve accurate descriptions, dates, qualifications, and contact details. Ask for missing facts instead of inventing them.
- Use functional React components and surrounding formatting. Reuse existing components; avoid unrelated rewrites or dependencies.
- Keep hooks at the top level. Use complete effect dependencies and clean up effects on unmount.
- Import images from `src/assets` so Vite can generate deployment URLs. Use meaningful names, exact filename case, and compressed images.
- Keep `base: '/Portfolio-Rafeeq/'` and hash routing for current hosting. Avoid root-relative asset URLs that bypass the repository subpath.
- Use semantic links and buttons, useful alt text, visible keyboard focus, readable contrast, and reduced-motion alternatives when adding animations.
- Commit `package-lock.json` with intentional dependency changes. Do not hand-edit the lockfile or upgrade dependencies as unrelated cleanup.
- Never include secrets in source or `VITE_*` variables: these are embedded in public browser code.

## How CI/CD works

CI means automatic checks. CD means delivering or deploying the checked build.

The workflow runs on pull requests targeting `main`, pushes to `main`, and manual runs. **Lint and build** installs the lockfile with `npm ci`, runs ESLint, and builds with Vite. CI uses Node.js 24, matching `.nvmrc`.

Only a successful run on `main` with `PORTFOLIO_PAGES_DEPLOY_ENABLED` set to the exact string `true` uploads a Pages artifact and starts deployment. It publishes the same build that passed checks. Pull requests cannot deploy; checks have read-only repository permission. Pages write permission is limited to deployment.

There is no automated unit or browser test suite yet. Lint and build do not prove that the website looks correct or every interaction works.

### Keep publishing disabled

Leave the repository Actions variable `PORTFOLIO_PAGES_DEPLOY_ENABLED` absent or `false`. Once this workflow is merged, CI runs but deployment is skipped. Do not use legacy `npm run deploy`: it publishes through `gh-pages` and bypasses the new gate.

Until this PR is merged, the previous workflow on `main` still exists and can deploy on pushes to `main`. The gate takes effect only when the new workflow replaces it. Avoid unrelated pushes to `main` while reviewing this change.

### Enable publishing later (owner action)

Do this only when you intend to release:

1. Merge the reviewed CI/CD PR with publishing still disabled.
2. In repository **Settings > Pages**, choose **GitHub Actions** as the build and deployment source.
3. In **Settings > Environments > github-pages**, restrict deployment branches to `main`. If you want separate release approval and your plan supports it, configure required reviewers.
4. In **Settings > Secrets and variables > Actions > Variables**, create repository variable `PORTFOLIO_PAGES_DEPLOY_ENABLED` with value `true`. It is an ordinary variable, not a secret. No personal access token is needed.
5. Open **Actions > Portfolio CI and Pages > Run workflow**, select `main`, and run it. This publishes if checks pass. Subsequent pushes or merges to `main` also publish automatically while enabled.
6. Check the workflow's deployment URL and verify the live pages.

Changing the variable alone does not start a run. Set it to `false` to prevent future deployments; that does not cancel an already-running deployment or take the existing site offline.

### Protect main

After the first successful PR check, configure a branch ruleset or protection rule for `main` requiring a pull request and the **Lint and build** status check. Select the actual check displayed by GitHub. This is a repository setting; YAML alone does not enforce it. Without protection, GitHub may still allow merging a failing PR.

### Recovery and troubleshooting

- **Install failed:** inspect logs and verify `package.json` and the lockfile agree. Use Node.js 24 and `npm ci`.
- **Lint failed:** fix the reported file/line instead of silencing whole categories.
- **Build failed:** check imports, exact filename case, and missing assets. Linux CI is case-sensitive.
- **Deployment skipped:** expected while the variable is absent/false or the run is a PR or non-main manual run.
- **Deployment failed:** inspect Pages source, environment restrictions/approvals, and the failed step.
- **Bad release:** revert the offending change through a PR. After checks and review, merge the revert; with publishing enabled, the previous source is rebuilt and published. Avoid force-pushing `main`.

## Review checklist

- Lint and build pass; warnings are understood and recorded.
- Content is accurate; links, resume actions, and images work.
- For UI changes: inspect desktop/mobile widths, keyboard navigation, affected hash routes, page refresh, and browser console errors.
- No generated files, credentials, or unintended personal information.
- The PR explains changes and checks actually performed.
- Merge and publish only when authorized.

Reference: [GitHub's custom Pages workflows guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
