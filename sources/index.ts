import { Plugin } from "@yarnpkg/core";

import regen from "./commands/regen";

const plugin: Plugin = {
  commands: [regen],
};

export default plugin;
