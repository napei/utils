import { BaseCommand, WorkspaceRequiredError } from "@yarnpkg/cli";
import { Configuration, Project, Cache, StreamReport, HardDependencies, structUtils } from "@yarnpkg/core";

export default class RegenCommand extends BaseCommand {
  static paths = [[`pin`]];

  async execute(): Promise<number | void> {
    const configuration: Configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);

    if (!workspace) throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
    let hasAnyChanged = false;
    for (const workspace of project.workspaces) {
      for (const dependencyType of [`dependencies`, `devDependencies`] as Array<HardDependencies>) {
        const dependencies = workspace.manifest[dependencyType];

        for (const descriptor of dependencies.values()) {
          if (descriptor.range.includes(`^`)) {
            const newRange = descriptor.range.replace(`^`, ``);
            dependencies.set(descriptor.identHash, structUtils.makeDescriptor(descriptor, newRange));
            this.context.stdout.write(`Pinned ${descriptor.name} to ${newRange}\n`);
            hasAnyChanged = true;
          }

          if (descriptor.range.includes(`~`)) {
            const newRange = descriptor.range.replace(`~`, ``);
            dependencies.set(descriptor.identHash, structUtils.makeDescriptor(descriptor, newRange));
            this.context.stdout.write(`Pinned ${descriptor.name} to ${newRange}\n`);
            hasAnyChanged = true;
          }
        }
      }
    }

    if (hasAnyChanged) {
      const installReport = await StreamReport.start(
        {
          configuration,
          stdout: this.context.stdout,
          includeLogs: !this.context.quiet,
        },
        async (report) => {
          this.context.stdout.write("Running yarn install...\n");
          await project.install({ cache, report });
        }
      );
      return installReport.exitCode();
    } else {
      this.context.stdout.write("No dependencies found to pin...\n");
    }
  }
}
