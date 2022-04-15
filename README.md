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

- `package.json` (Add lint:json task to package.json)
- `.gitignore` (Add eslint output file to .gitignore)
- `.eslintrc.js` (Add getWorfklowOverrides() to .eslintrc.js)

**Recommended setup**

For an ideal developer experience, it is recommended that your ESLint output is empty (ie. `0 errors, 0 warnings`), so that developers know **whether their changes has introduced any lint errors**

You can do this with ESLint by using `--max-warnings=0` argument, eg:

```bash
eslint --max-warnings=0 .
```

# API

## CLI

**Top-level Commands**

| Command | Detail                                       |
| ------- | -------------------------------------------- |
| `view`  | Print yml file contents                      |
| `entry` | Interact with entries.yml file               |
| `init`  | Sets up eslint-workflows for current project |

**Commands**

1. `eslint-workflows view`

   Print yml file contents, useful for quickly viewing yml file contents.

1. `eslint-workflows entry`

   Interact with entries.yml file.

   Subcommands:

   - `entry add`: Add an entry
   - `entry remove`: Remove an entry or part of an entry
   - `entry fmt`: Apply formatter to yml file

1. `eslint-workflows init`

   Sets up baseline config for eslint-workflows usage in the current project

## Node.js

1. `getWorkflowOverrides()`

   Computes overrides from yml file to be applied to ESLint config.

# Tool Configuration

1. `.eslint-workflowsrc.js`

Config for `eslint-workflows`.

Schema:

```js
module.exports = {
  eslintOutputPath: "eslint-workflows/eslint-output.json",
  codeownersPath: ".github/CODEOWNERS",
  workflowsEntriesPath: "eslint-workflows/eslint-workflows-entries.yml",
};
```

Properties:

- `eslintOutputPath` (required): Path to `eslint output` json
- `codeownersPath` (optional): Path to `CODEOWNERS`
- `workflowsEntriesPath` (required): Path to `yml` file

Note:

- For all path-related properties, you may use absolute paths or relative paths (will be resolved against `process.cwd()`)

2. `eslint-workflows-entries.yml`

Tracks mutes at the file-level + rule-level.

Example:

```yml
entries:
  - ruleId: no-unused-vars
    teams:
      "@team-a":
        files:
          - src/team-a/file-a.js
      "@team-b":
        files:
          - src/team-b/file-b.js
      _NO_OWNER_:
        files:
          - src/no-owner/no-owner.js
```

Properties:

- `entries`: Represents an entry in the yml file
- `entry`: Represents a combination of a rule + teams
- `teams`: Represents individual team with related files for muting

# Developing

Please refer to this [README](./packages/eslint-workflows/README.md).
