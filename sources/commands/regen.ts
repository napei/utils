import { BaseCommand } from "@yarnpkg/cli";
import { Configuration, Project, Cache, StreamReport } from "@yarnpkg/core";
import {
  VirtualFS,
  ZipOpenFS,
  xfs,
  FakeFS,
  NativePath,
  Filename,
  ppath,
} from "@yarnpkg/fslib";
import { join } from "path";
import { Option } from "clipanion";

const NODE_MODULES = `node_modules` as Filename;
const LOCK_FILE = "yarn.lock" as Filename;

export default class RegenCommand extends BaseCommand {
  static paths = [[`regen`]];

  force = Option.Boolean("-f,--force", {
    description: "Force the command to run",
  });

  async execute(): Promise<number | void> {
    const configuration: Configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins
    );
    const { project } = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);

    if (configuration.get("nodeLinker")) {
      const nodeModulesPath = ppath.join(project.cwd, NODE_MODULES);
      await xfs.removePromise(nodeModulesPath, { recursive: true });
    }

    const lockPath = ppath.join(project.cwd, LOCK_FILE);
    await xfs.removePromise(lockPath);

    const installReport = await StreamReport.start(
      {
        configuration,
        stdout: this.context.stdout,
        includeLogs: !this.context.quiet,
      },
      async (report) => {
        await project.install({ cache, report });
      }
    );

    return installReport.exitCode();
  }
}
