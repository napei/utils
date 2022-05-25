import { Plugin } from "@yarnpkg/core";

import regen from "./commands/regen";
import pin from "./commands/pin";

const plugin: Plugin = {
  commands: [regen, pin],
};

export default plugin;
