# Yarn Utils Plugin

_Disclaimer: None of this is tested properly yet, it just "works" for now._

## Regen Command

Adds `yarn regen`

Removes `yarn.lock` and `node_modules` (if it exists) then runs `yarn install` for you. Because sometimes you need to do that.

**Installation:**

`yarn plugin import https://raw.githubusercontent.com/napei/utils/main/bundles/%40yarnpkg/plugin-utils.js`
