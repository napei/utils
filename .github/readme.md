# Yarn Utils Plugin

_Disclaimer: None of this is tested properly yet, it just "works" for now._

## Installation

`yarn plugin import https://raw.githubusercontent.com/napei/utils/main/bundles/%40yarnpkg/plugin-utils.js`

---

## Commands

### Regen Command

Adds `yarn regen`

Removes `yarn.lock` and `node_modules` (if it exists) then runs `yarn install` for you. Because sometimes you need to do that.

### Pin Command

Adds `yarn pin`

Removes `~` and `^` from `package.json` and then runs `yarn install` for you. Useful if you like to pin dependencies a lot and want to do this, or install a package and forgot about `-E`.
