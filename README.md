# @nossbigg/eslint-workflows

**Surgically mute ESLint errors at scale 🤫⚡️**

🔪 Silence lint errors selectively at per-file + per-rule basis

💪 Great for monorepos / large teams / noisy rules

# Problem / Solution

**Problem**

1. Introducing a new ESLint rule usually adds a lot of errors/warnings.
2. It's hard to address all these errors in one go.
3. At the same time, you want to apply this new rule to all new code.

> In a large monorepo with many developers adding new code all the time, you're essentially fighting a losing battle trying to fix lint errors faster than they come...

> _If only there was a better way..._ 🤔

**Solution**

`eslint-workflows` allows you to **incrementally** apply lint rules to your codebase, via the following features:

1. Helps you **mute lint errors** at **per-file + per-rule** basis.

2. Tracks all mutes via a **human-readable `.yml` file**.

3. **Autogenerates `.yml` changes** from `eslint output` when you need to add new entries.

4. Contains an intuitive CLI interface to let you to **safely modify the `.yml` file**.

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
