# eslint-workflows > eslint-workflows

_Where the CLI logic sits in 🧠_

Note: For usage and intro, please refer to the landing page's [README](../../README.md) 🙂

## Developing

1. Install dependencies: `yarn`
1. Symlink packages together

   - In `eslint-workflows/`: `yarn link`
   - In `sandbox/`: `yarn link @nossbigg/eslint-workflows`

1. In `eslint-workflows`, start dev server: `yarn dev`
1. In `sandbox/`, test changes:

   - For CLI changes: `yarn ew <command>`
   - For API changes: Execute any JS file, or via `.eslintrc.js`

## Publishing

1. `yarn publish`
