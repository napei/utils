/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-utils",
factory: function (require) {
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // pnp:C:\_p\regen\sources\index.ts
  var sources_exports = {};
  __export(sources_exports, {
    default: () => sources_default
  });

  // pnp:C:\_p\regen\sources\commands\regen.ts
  var import_cli = __toModule(__require("@yarnpkg/cli"));
  var import_core = __toModule(__require("@yarnpkg/core"));
  var import_fslib = __toModule(__require("@yarnpkg/fslib"));
  var NODE_MODULES = `node_modules`;
  var LOCK_FILE = "yarn.lock";
  var RegenCommand = class extends import_cli.BaseCommand {
    async execute() {
      const configuration = await import_core.Configuration.find(this.context.cwd, this.context.plugins);
      const {project} = await import_core.Project.find(configuration, this.context.cwd);
      const cache = await import_core.Cache.find(configuration);
      if (configuration.get("nodeLinker")) {
        const nodeModulesPath = import_fslib.ppath.join(project.cwd, NODE_MODULES);
        await import_fslib.xfs.removePromise(nodeModulesPath, {recursive: true});
      }
      const lockPath = import_fslib.ppath.join(project.cwd, LOCK_FILE);
      await import_fslib.xfs.removePromise(lockPath);
      const installReport = await import_core.StreamReport.start({
        configuration,
        stdout: this.context.stdout,
        includeLogs: !this.context.quiet
      }, async (report) => {
        await project.install({cache, report});
      });
      return installReport.exitCode();
    }
  };
  RegenCommand.paths = [[`regen`]];
  var regen_default = RegenCommand;

  // pnp:C:\_p\regen\sources\commands\pin.ts
  var import_cli2 = __toModule(__require("@yarnpkg/cli"));
  var import_core2 = __toModule(__require("@yarnpkg/core"));
  var RegenCommand2 = class extends import_cli2.BaseCommand {
    async execute() {
      const configuration = await import_core2.Configuration.find(this.context.cwd, this.context.plugins);
      const {project, workspace} = await import_core2.Project.find(configuration, this.context.cwd);
      const cache = await import_core2.Cache.find(configuration);
      if (!workspace)
        throw new import_cli2.WorkspaceRequiredError(project.cwd, this.context.cwd);
      let hasAnyChanged = false;
      for (const workspace2 of project.workspaces) {
        for (const dependencyType of [`dependencies`, `devDependencies`]) {
          const dependencies = workspace2.manifest[dependencyType];
          for (const descriptor of dependencies.values()) {
            if (descriptor.range.includes(`^`)) {
              const newRange = descriptor.range.replace(`^`, ``);
              dependencies.set(descriptor.identHash, import_core2.structUtils.makeDescriptor(descriptor, newRange));
              this.context.stdout.write(`Pinned ${descriptor.name} to ${newRange}
`);
              hasAnyChanged = true;
            }
            if (descriptor.range.includes(`~`)) {
              const newRange = descriptor.range.replace(`~`, ``);
              dependencies.set(descriptor.identHash, import_core2.structUtils.makeDescriptor(descriptor, newRange));
              this.context.stdout.write(`Pinned ${descriptor.name} to ${newRange}
`);
              hasAnyChanged = true;
            }
          }
        }
      }
      if (hasAnyChanged) {
        const installReport = await import_core2.StreamReport.start({
          configuration,
          stdout: this.context.stdout,
          includeLogs: !this.context.quiet
        }, async (report) => {
          this.context.stdout.write("Running yarn install...\n");
          await project.install({cache, report});
        });
        return installReport.exitCode();
      } else {
        this.context.stdout.write("No dependencies found to pin...\n");
      }
    }
  };
  RegenCommand2.paths = [[`pin`]];
  var pin_default = RegenCommand2;

  // pnp:C:\_p\regen\sources\index.ts
  var plugin = {
    commands: [regen_default, pin_default]
  };
  var sources_default = plugin;
  return sources_exports;
})();
return plugin;
}
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG5wOkM6XFxfcFxccmVnZW5cXHNvdXJjZXNcXGluZGV4LnRzIiwgInBucDpDOlxcX3BcXHJlZ2VuXFxzb3VyY2VzXFxjb21tYW5kc1xccmVnZW4udHMiLCAicG5wOkM6XFxfcFxccmVnZW5cXHNvdXJjZXNcXGNvbW1hbmRzXFxwaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBsdWdpbiB9IGZyb20gXCJAeWFybnBrZy9jb3JlXCI7XG5cbmltcG9ydCByZWdlbiBmcm9tIFwiLi9jb21tYW5kcy9yZWdlblwiO1xuaW1wb3J0IHBpbiBmcm9tIFwiLi9jb21tYW5kcy9waW5cIjtcblxuY29uc3QgcGx1Z2luOiBQbHVnaW4gPSB7XG4gIGNvbW1hbmRzOiBbcmVnZW4sIHBpbl0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4iLCAiaW1wb3J0IHsgQmFzZUNvbW1hbmQgfSBmcm9tIFwiQHlhcm5wa2cvY2xpXCI7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQcm9qZWN0LCBDYWNoZSwgU3RyZWFtUmVwb3J0IH0gZnJvbSBcIkB5YXJucGtnL2NvcmVcIjtcbmltcG9ydCB7IHhmcywgRmlsZW5hbWUsIHBwYXRoIH0gZnJvbSBcIkB5YXJucGtnL2ZzbGliXCI7XG5cbmNvbnN0IE5PREVfTU9EVUxFUyA9IGBub2RlX21vZHVsZXNgIGFzIEZpbGVuYW1lO1xuY29uc3QgTE9DS19GSUxFID0gXCJ5YXJuLmxvY2tcIiBhcyBGaWxlbmFtZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnZW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBzdGF0aWMgcGF0aHMgPSBbW2ByZWdlbmBdXTtcblxuICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8bnVtYmVyIHwgdm9pZD4ge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBhd2FpdCBDb25maWd1cmF0aW9uLmZpbmQodGhpcy5jb250ZXh0LmN3ZCwgdGhpcy5jb250ZXh0LnBsdWdpbnMpO1xuICAgIGNvbnN0IHsgcHJvamVjdCB9ID0gYXdhaXQgUHJvamVjdC5maW5kKGNvbmZpZ3VyYXRpb24sIHRoaXMuY29udGV4dC5jd2QpO1xuICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgQ2FjaGUuZmluZChjb25maWd1cmF0aW9uKTtcblxuICAgIGlmIChjb25maWd1cmF0aW9uLmdldChcIm5vZGVMaW5rZXJcIikpIHtcbiAgICAgIGNvbnN0IG5vZGVNb2R1bGVzUGF0aCA9IHBwYXRoLmpvaW4ocHJvamVjdC5jd2QsIE5PREVfTU9EVUxFUyk7XG4gICAgICBhd2FpdCB4ZnMucmVtb3ZlUHJvbWlzZShub2RlTW9kdWxlc1BhdGgsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGxvY2tQYXRoID0gcHBhdGguam9pbihwcm9qZWN0LmN3ZCwgTE9DS19GSUxFKTtcbiAgICBhd2FpdCB4ZnMucmVtb3ZlUHJvbWlzZShsb2NrUGF0aCk7XG5cbiAgICBjb25zdCBpbnN0YWxsUmVwb3J0ID0gYXdhaXQgU3RyZWFtUmVwb3J0LnN0YXJ0KFxuICAgICAge1xuICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICBzdGRvdXQ6IHRoaXMuY29udGV4dC5zdGRvdXQsXG4gICAgICAgIGluY2x1ZGVMb2dzOiAhdGhpcy5jb250ZXh0LnF1aWV0LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChyZXBvcnQpID0+IHtcbiAgICAgICAgYXdhaXQgcHJvamVjdC5pbnN0YWxsKHsgY2FjaGUsIHJlcG9ydCB9KTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIGluc3RhbGxSZXBvcnQuZXhpdENvZGUoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VDb21tYW5kLCBXb3Jrc3BhY2VSZXF1aXJlZEVycm9yIH0gZnJvbSBcIkB5YXJucGtnL2NsaVwiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgUHJvamVjdCwgQ2FjaGUsIFN0cmVhbVJlcG9ydCwgSGFyZERlcGVuZGVuY2llcywgc3RydWN0VXRpbHMgfSBmcm9tIFwiQHlhcm5wa2cvY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdlbkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIHN0YXRpYyBwYXRocyA9IFtbYHBpbmBdXTtcblxuICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8bnVtYmVyIHwgdm9pZD4ge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBhd2FpdCBDb25maWd1cmF0aW9uLmZpbmQodGhpcy5jb250ZXh0LmN3ZCwgdGhpcy5jb250ZXh0LnBsdWdpbnMpO1xuICAgIGNvbnN0IHsgcHJvamVjdCwgd29ya3NwYWNlIH0gPSBhd2FpdCBQcm9qZWN0LmZpbmQoY29uZmlndXJhdGlvbiwgdGhpcy5jb250ZXh0LmN3ZCk7XG4gICAgY29uc3QgY2FjaGUgPSBhd2FpdCBDYWNoZS5maW5kKGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgaWYgKCF3b3Jrc3BhY2UpIHRocm93IG5ldyBXb3Jrc3BhY2VSZXF1aXJlZEVycm9yKHByb2plY3QuY3dkLCB0aGlzLmNvbnRleHQuY3dkKTtcbiAgICBsZXQgaGFzQW55Q2hhbmdlZCA9IGZhbHNlO1xuICAgIGZvciAoY29uc3Qgd29ya3NwYWNlIG9mIHByb2plY3Qud29ya3NwYWNlcykge1xuICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5VHlwZSBvZiBbYGRlcGVuZGVuY2llc2AsIGBkZXZEZXBlbmRlbmNpZXNgXSBhcyBBcnJheTxIYXJkRGVwZW5kZW5jaWVzPikge1xuICAgICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB3b3Jrc3BhY2UubWFuaWZlc3RbZGVwZW5kZW5jeVR5cGVdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZGVzY3JpcHRvciBvZiBkZXBlbmRlbmNpZXMudmFsdWVzKCkpIHtcbiAgICAgICAgICBpZiAoZGVzY3JpcHRvci5yYW5nZS5pbmNsdWRlcyhgXmApKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdSYW5nZSA9IGRlc2NyaXB0b3IucmFuZ2UucmVwbGFjZShgXmAsIGBgKTtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llcy5zZXQoZGVzY3JpcHRvci5pZGVudEhhc2gsIHN0cnVjdFV0aWxzLm1ha2VEZXNjcmlwdG9yKGRlc2NyaXB0b3IsIG5ld1JhbmdlKSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKGBQaW5uZWQgJHtkZXNjcmlwdG9yLm5hbWV9IHRvICR7bmV3UmFuZ2V9XFxuYCk7XG4gICAgICAgICAgICBoYXNBbnlDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZGVzY3JpcHRvci5yYW5nZS5pbmNsdWRlcyhgfmApKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdSYW5nZSA9IGRlc2NyaXB0b3IucmFuZ2UucmVwbGFjZShgfmAsIGBgKTtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llcy5zZXQoZGVzY3JpcHRvci5pZGVudEhhc2gsIHN0cnVjdFV0aWxzLm1ha2VEZXNjcmlwdG9yKGRlc2NyaXB0b3IsIG5ld1JhbmdlKSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKGBQaW5uZWQgJHtkZXNjcmlwdG9yLm5hbWV9IHRvICR7bmV3UmFuZ2V9XFxuYCk7XG4gICAgICAgICAgICBoYXNBbnlDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzQW55Q2hhbmdlZCkge1xuICAgICAgY29uc3QgaW5zdGFsbFJlcG9ydCA9IGF3YWl0IFN0cmVhbVJlcG9ydC5zdGFydChcbiAgICAgICAge1xuICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgc3Rkb3V0OiB0aGlzLmNvbnRleHQuc3Rkb3V0LFxuICAgICAgICAgIGluY2x1ZGVMb2dzOiAhdGhpcy5jb250ZXh0LnF1aWV0LFxuICAgICAgICB9LFxuICAgICAgICBhc3luYyAocmVwb3J0KSA9PiB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShcIlJ1bm5pbmcgeWFybiBpbnN0YWxsLi4uXFxuXCIpO1xuICAgICAgICAgIGF3YWl0IHByb2plY3QuaW5zdGFsbCh7IGNhY2hlLCByZXBvcnQgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gaW5zdGFsbFJlcG9ydC5leGl0Q29kZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKFwiTm8gZGVwZW5kZW5jaWVzIGZvdW5kIHRvIHBpbi4uLlxcblwiKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLG1CQUE0QjtBQUM1QixvQkFBNEQ7QUFDNUQscUJBQXFDO0FBRXJDLE1BQU0sZUFBZTtBQUNyQixNQUFNLFlBQVk7QUFFbEIsbUNBQTBDLHVCQUFZO0FBQUEsVUFHOUMsVUFBa0M7QUFDdEMsWUFBTSxnQkFBK0IsTUFBTSwwQkFBYyxLQUFLLEtBQUssUUFBUSxLQUFLLEtBQUssUUFBUTtBQUM3RixZQUFNLENBQUUsV0FBWSxNQUFNLG9CQUFRLEtBQUssZUFBZSxLQUFLLFFBQVE7QUFDbkUsWUFBTSxRQUFRLE1BQU0sa0JBQU0sS0FBSztBQUUvQixVQUFJLGNBQWMsSUFBSSxlQUFlO0FBQ25DLGNBQU0sa0JBQWtCLG1CQUFNLEtBQUssUUFBUSxLQUFLO0FBQ2hELGNBQU0saUJBQUksY0FBYyxpQkFBaUIsQ0FBRSxXQUFXO0FBQUE7QUFHeEQsWUFBTSxXQUFXLG1CQUFNLEtBQUssUUFBUSxLQUFLO0FBQ3pDLFlBQU0saUJBQUksY0FBYztBQUV4QixZQUFNLGdCQUFnQixNQUFNLHlCQUFhLE1BQ3ZDO0FBQUEsUUFDRTtBQUFBLFFBQ0EsUUFBUSxLQUFLLFFBQVE7QUFBQSxRQUNyQixhQUFhLENBQUMsS0FBSyxRQUFRO0FBQUEsU0FFN0IsT0FBTyxXQUFXO0FBQ2hCLGNBQU0sUUFBUSxRQUFRLENBQUUsT0FBTztBQUFBO0FBSW5DLGFBQU8sY0FBYztBQUFBO0FBQUE7QUExQmhCLEVBRFQsYUFDUyxRQUFRLENBQUMsQ0FBQztBQURuQixNQUFPLGdCQUFQOzs7QUNQQSxvQkFBb0Q7QUFDcEQscUJBQTJGO0FBRTNGLG9DQUEwQyx3QkFBWTtBQUFBLFVBRzlDLFVBQWtDO0FBQ3RDLFlBQU0sZ0JBQStCLE1BQU0sMkJBQWMsS0FBSyxLQUFLLFFBQVEsS0FBSyxLQUFLLFFBQVE7QUFDN0YsWUFBTSxDQUFFLFNBQVMsYUFBYyxNQUFNLHFCQUFRLEtBQUssZUFBZSxLQUFLLFFBQVE7QUFDOUUsWUFBTSxRQUFRLE1BQU0sbUJBQU0sS0FBSztBQUUvQixVQUFJLENBQUM7QUFBVyxjQUFNLElBQUksbUNBQXVCLFFBQVEsS0FBSyxLQUFLLFFBQVE7QUFDM0UsVUFBSSxnQkFBZ0I7QUFDcEIsaUJBQVcsY0FBYSxRQUFRLFlBQVk7QUFDMUMsbUJBQVcsa0JBQWtCLENBQUMsZ0JBQWdCLG9CQUErQztBQUMzRixnQkFBTSxlQUFlLFdBQVUsU0FBUztBQUV4QyxxQkFBVyxjQUFjLGFBQWEsVUFBVTtBQUM5QyxnQkFBSSxXQUFXLE1BQU0sU0FBUyxNQUFNO0FBQ2xDLG9CQUFNLFdBQVcsV0FBVyxNQUFNLFFBQVEsS0FBSztBQUMvQywyQkFBYSxJQUFJLFdBQVcsV0FBVyx5QkFBWSxlQUFlLFlBQVk7QUFDOUUsbUJBQUssUUFBUSxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVc7QUFBQTtBQUMxRCw4QkFBZ0I7QUFBQTtBQUdsQixnQkFBSSxXQUFXLE1BQU0sU0FBUyxNQUFNO0FBQ2xDLG9CQUFNLFdBQVcsV0FBVyxNQUFNLFFBQVEsS0FBSztBQUMvQywyQkFBYSxJQUFJLFdBQVcsV0FBVyx5QkFBWSxlQUFlLFlBQVk7QUFDOUUsbUJBQUssUUFBUSxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVc7QUFBQTtBQUMxRCw4QkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU14QixVQUFJLGVBQWU7QUFDakIsY0FBTSxnQkFBZ0IsTUFBTSwwQkFBYSxNQUN2QztBQUFBLFVBQ0U7QUFBQSxVQUNBLFFBQVEsS0FBSyxRQUFRO0FBQUEsVUFDckIsYUFBYSxDQUFDLEtBQUssUUFBUTtBQUFBLFdBRTdCLE9BQU8sV0FBVztBQUNoQixlQUFLLFFBQVEsT0FBTyxNQUFNO0FBQzFCLGdCQUFNLFFBQVEsUUFBUSxDQUFFLE9BQU87QUFBQTtBQUduQyxlQUFPLGNBQWM7QUFBQSxhQUNoQjtBQUNMLGFBQUssUUFBUSxPQUFPLE1BQU07QUFBQTtBQUFBO0FBQUE7QUE3Q3ZCLEVBRFQsY0FDUyxRQUFRLENBQUMsQ0FBQztBQURuQixNQUFPLGNBQVA7OztBRkVBLE1BQU0sU0FBaUI7QUFBQSxJQUNyQixVQUFVLENBQUMsZUFBTztBQUFBO0FBR3BCLE1BQU8sa0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
