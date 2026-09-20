# clavo-website

CLAVO Construction Company Limited delivers high-quality civil engineering and electrical infrastructure solutions, specializing in road construction, gabion retaining structures, drainage systems, street lighting, and public infrastructure projects for county governments, institutions, and private clients.

This repository hosts the company website for CLAVO Construction Company Limited.

## Deployment

The site is deployed to GitHub Pages using a GitHub Actions workflow.

### How it works

- The source website files live in the `site/` folder.
- On push to the `main` branch, GitHub Actions publishes the site to GitHub Pages.
- The live URL is generated automatically by GitHub Pages.

### Steps to publish

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In the GitHub repository, open: Settings > Pages.
4. Select the deployment source as: GitHub Actions.
5. Save the settings.
6. The action will publish the site automatically.

## Local preview

Open `site/index.html` in a browser or run a simple local static server if needed.

## Structure

- `site/` — static website source files
- `.github/workflows/deploy-pages.yml` — CI/CD workflow for deployment
