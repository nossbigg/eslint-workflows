# @nossbigg/eslint-workflows

**Surgically mute ESLint errors at scale 🤫⚡️**

# Problem / Solution

**Problem**

1. Introducing a new ESLint rule usually adds a lot of errors/warnings.
2. It's hard to address all these errors in one go.
3. At the same time, you want to apply this new rule to all new code.

**Solution**

`eslint-workflows` does the following for you:

1. Helps you mute ESLint errors at per-file + per-rule basis.

2. Tracks all mutes via a human-readable `.yml` file.

3. Reads `eslint output` and autogenerates `.yml` changes when you need to add new entries.

4. -TBC-

`eslint-workflows` is great for:

- Monorepos
- Large teams
- Large number of files
- Noisy rules

# Setup

**Initial setup**

1.  Install `eslint-workflows`: `yarn add -D @nossbigg/eslint-workflows`
2.  In project root, run `eslint-workflows init`

    This step creates the following files:

- `.eslint-workflowsrc.js` (config for `eslint-workflows`)
- `eslint-workflows-entries.yml` (tracks mutes)

3. Follow instructions to apply manual changes to your repo

-TBC-

- package.json
- .gitignore
- .eslintrc.js

**Recommended setup**

-TBC-

- `0 error + 0 warn`

# API

**CLI**

-TBC-

**Node.js**

-TBC-

# Tool Configuration

-TBC-

# Developing

Please refer to this [README](./packages/eslint-workflows/README.md).
