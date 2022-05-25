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
  var PinCommand = class extends import_cli2.BaseCommand {
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
  PinCommand.paths = [[`pin`]];
  var pin_default = PinCommand;

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG5wOkM6XFxfcFxccmVnZW5cXHNvdXJjZXNcXGluZGV4LnRzIiwgInBucDpDOlxcX3BcXHJlZ2VuXFxzb3VyY2VzXFxjb21tYW5kc1xccmVnZW4udHMiLCAicG5wOkM6XFxfcFxccmVnZW5cXHNvdXJjZXNcXGNvbW1hbmRzXFxwaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBsdWdpbiB9IGZyb20gXCJAeWFybnBrZy9jb3JlXCI7XG5cbmltcG9ydCByZWdlbiBmcm9tIFwiLi9jb21tYW5kcy9yZWdlblwiO1xuaW1wb3J0IHBpbiBmcm9tIFwiLi9jb21tYW5kcy9waW5cIjtcblxuY29uc3QgcGx1Z2luOiBQbHVnaW4gPSB7XG4gIGNvbW1hbmRzOiBbcmVnZW4sIHBpbl0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4iLCAiaW1wb3J0IHsgQmFzZUNvbW1hbmQgfSBmcm9tIFwiQHlhcm5wa2cvY2xpXCI7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQcm9qZWN0LCBDYWNoZSwgU3RyZWFtUmVwb3J0IH0gZnJvbSBcIkB5YXJucGtnL2NvcmVcIjtcbmltcG9ydCB7IHhmcywgRmlsZW5hbWUsIHBwYXRoIH0gZnJvbSBcIkB5YXJucGtnL2ZzbGliXCI7XG5cbmNvbnN0IE5PREVfTU9EVUxFUyA9IGBub2RlX21vZHVsZXNgIGFzIEZpbGVuYW1lO1xuY29uc3QgTE9DS19GSUxFID0gXCJ5YXJuLmxvY2tcIiBhcyBGaWxlbmFtZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnZW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBzdGF0aWMgcGF0aHMgPSBbW2ByZWdlbmBdXTtcblxuICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8bnVtYmVyIHwgdm9pZD4ge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBhd2FpdCBDb25maWd1cmF0aW9uLmZpbmQodGhpcy5jb250ZXh0LmN3ZCwgdGhpcy5jb250ZXh0LnBsdWdpbnMpO1xuICAgIGNvbnN0IHsgcHJvamVjdCB9ID0gYXdhaXQgUHJvamVjdC5maW5kKGNvbmZpZ3VyYXRpb24sIHRoaXMuY29udGV4dC5jd2QpO1xuICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgQ2FjaGUuZmluZChjb25maWd1cmF0aW9uKTtcblxuICAgIGlmIChjb25maWd1cmF0aW9uLmdldChcIm5vZGVMaW5rZXJcIikpIHtcbiAgICAgIGNvbnN0IG5vZGVNb2R1bGVzUGF0aCA9IHBwYXRoLmpvaW4ocHJvamVjdC5jd2QsIE5PREVfTU9EVUxFUyk7XG4gICAgICBhd2FpdCB4ZnMucmVtb3ZlUHJvbWlzZShub2RlTW9kdWxlc1BhdGgsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGxvY2tQYXRoID0gcHBhdGguam9pbihwcm9qZWN0LmN3ZCwgTE9DS19GSUxFKTtcbiAgICBhd2FpdCB4ZnMucmVtb3ZlUHJvbWlzZShsb2NrUGF0aCk7XG5cbiAgICBjb25zdCBpbnN0YWxsUmVwb3J0ID0gYXdhaXQgU3RyZWFtUmVwb3J0LnN0YXJ0KFxuICAgICAge1xuICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICBzdGRvdXQ6IHRoaXMuY29udGV4dC5zdGRvdXQsXG4gICAgICAgIGluY2x1ZGVMb2dzOiAhdGhpcy5jb250ZXh0LnF1aWV0LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChyZXBvcnQpID0+IHtcbiAgICAgICAgYXdhaXQgcHJvamVjdC5pbnN0YWxsKHsgY2FjaGUsIHJlcG9ydCB9KTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIGluc3RhbGxSZXBvcnQuZXhpdENvZGUoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VDb21tYW5kLCBXb3Jrc3BhY2VSZXF1aXJlZEVycm9yIH0gZnJvbSBcIkB5YXJucGtnL2NsaVwiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgUHJvamVjdCwgQ2FjaGUsIFN0cmVhbVJlcG9ydCwgSGFyZERlcGVuZGVuY2llcywgc3RydWN0VXRpbHMgfSBmcm9tIFwiQHlhcm5wa2cvY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBzdGF0aWMgcGF0aHMgPSBbW2BwaW5gXV07XG5cbiAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPG51bWJlciB8IHZvaWQ+IHtcbiAgICBjb25zdCBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gYXdhaXQgQ29uZmlndXJhdGlvbi5maW5kKHRoaXMuY29udGV4dC5jd2QsIHRoaXMuY29udGV4dC5wbHVnaW5zKTtcbiAgICBjb25zdCB7IHByb2plY3QsIHdvcmtzcGFjZSB9ID0gYXdhaXQgUHJvamVjdC5maW5kKGNvbmZpZ3VyYXRpb24sIHRoaXMuY29udGV4dC5jd2QpO1xuICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgQ2FjaGUuZmluZChjb25maWd1cmF0aW9uKTtcblxuICAgIGlmICghd29ya3NwYWNlKSB0aHJvdyBuZXcgV29ya3NwYWNlUmVxdWlyZWRFcnJvcihwcm9qZWN0LmN3ZCwgdGhpcy5jb250ZXh0LmN3ZCk7XG4gICAgbGV0IGhhc0FueUNoYW5nZWQgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHdvcmtzcGFjZSBvZiBwcm9qZWN0LndvcmtzcGFjZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeVR5cGUgb2YgW2BkZXBlbmRlbmNpZXNgLCBgZGV2RGVwZW5kZW5jaWVzYF0gYXMgQXJyYXk8SGFyZERlcGVuZGVuY2llcz4pIHtcbiAgICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gd29ya3NwYWNlLm1hbmlmZXN0W2RlcGVuZGVuY3lUeXBlXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGRlc2NyaXB0b3Igb2YgZGVwZW5kZW5jaWVzLnZhbHVlcygpKSB7XG4gICAgICAgICAgaWYgKGRlc2NyaXB0b3IucmFuZ2UuaW5jbHVkZXMoYF5gKSkge1xuICAgICAgICAgICAgY29uc3QgbmV3UmFuZ2UgPSBkZXNjcmlwdG9yLnJhbmdlLnJlcGxhY2UoYF5gLCBgYCk7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMuc2V0KGRlc2NyaXB0b3IuaWRlbnRIYXNoLCBzdHJ1Y3RVdGlscy5tYWtlRGVzY3JpcHRvcihkZXNjcmlwdG9yLCBuZXdSYW5nZSkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShgUGlubmVkICR7ZGVzY3JpcHRvci5uYW1lfSB0byAke25ld1JhbmdlfVxcbmApO1xuICAgICAgICAgICAgaGFzQW55Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRlc2NyaXB0b3IucmFuZ2UuaW5jbHVkZXMoYH5gKSkge1xuICAgICAgICAgICAgY29uc3QgbmV3UmFuZ2UgPSBkZXNjcmlwdG9yLnJhbmdlLnJlcGxhY2UoYH5gLCBgYCk7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMuc2V0KGRlc2NyaXB0b3IuaWRlbnRIYXNoLCBzdHJ1Y3RVdGlscy5tYWtlRGVzY3JpcHRvcihkZXNjcmlwdG9yLCBuZXdSYW5nZSkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShgUGlubmVkICR7ZGVzY3JpcHRvci5uYW1lfSB0byAke25ld1JhbmdlfVxcbmApO1xuICAgICAgICAgICAgaGFzQW55Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc0FueUNoYW5nZWQpIHtcbiAgICAgIGNvbnN0IGluc3RhbGxSZXBvcnQgPSBhd2FpdCBTdHJlYW1SZXBvcnQuc3RhcnQoXG4gICAgICAgIHtcbiAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgIHN0ZG91dDogdGhpcy5jb250ZXh0LnN0ZG91dCxcbiAgICAgICAgICBpbmNsdWRlTG9nczogIXRoaXMuY29udGV4dC5xdWlldCxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgKHJlcG9ydCkgPT4ge1xuICAgICAgICAgIHRoaXMuY29udGV4dC5zdGRvdXQud3JpdGUoXCJSdW5uaW5nIHlhcm4gaW5zdGFsbC4uLlxcblwiKTtcbiAgICAgICAgICBhd2FpdCBwcm9qZWN0Lmluc3RhbGwoeyBjYWNoZSwgcmVwb3J0IH0pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmV0dXJuIGluc3RhbGxSZXBvcnQuZXhpdENvZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShcIk5vIGRlcGVuZGVuY2llcyBmb3VuZCB0byBwaW4uLi5cXG5cIik7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxtQkFBNEI7QUFDNUIsb0JBQTREO0FBQzVELHFCQUFxQztBQUVyQyxNQUFNLGVBQWU7QUFDckIsTUFBTSxZQUFZO0FBRWxCLG1DQUEwQyx1QkFBWTtBQUFBLFVBRzlDLFVBQWtDO0FBQ3RDLFlBQU0sZ0JBQStCLE1BQU0sMEJBQWMsS0FBSyxLQUFLLFFBQVEsS0FBSyxLQUFLLFFBQVE7QUFDN0YsWUFBTSxDQUFFLFdBQVksTUFBTSxvQkFBUSxLQUFLLGVBQWUsS0FBSyxRQUFRO0FBQ25FLFlBQU0sUUFBUSxNQUFNLGtCQUFNLEtBQUs7QUFFL0IsVUFBSSxjQUFjLElBQUksZUFBZTtBQUNuQyxjQUFNLGtCQUFrQixtQkFBTSxLQUFLLFFBQVEsS0FBSztBQUNoRCxjQUFNLGlCQUFJLGNBQWMsaUJBQWlCLENBQUUsV0FBVztBQUFBO0FBR3hELFlBQU0sV0FBVyxtQkFBTSxLQUFLLFFBQVEsS0FBSztBQUN6QyxZQUFNLGlCQUFJLGNBQWM7QUFFeEIsWUFBTSxnQkFBZ0IsTUFBTSx5QkFBYSxNQUN2QztBQUFBLFFBQ0U7QUFBQSxRQUNBLFFBQVEsS0FBSyxRQUFRO0FBQUEsUUFDckIsYUFBYSxDQUFDLEtBQUssUUFBUTtBQUFBLFNBRTdCLE9BQU8sV0FBVztBQUNoQixjQUFNLFFBQVEsUUFBUSxDQUFFLE9BQU87QUFBQTtBQUluQyxhQUFPLGNBQWM7QUFBQTtBQUFBO0FBMUJoQixFQURULGFBQ1MsUUFBUSxDQUFDLENBQUM7QUFEbkIsTUFBTyxnQkFBUDs7O0FDUEEsb0JBQW9EO0FBQ3BELHFCQUEyRjtBQUUzRixpQ0FBd0Msd0JBQVk7QUFBQSxVQUc1QyxVQUFrQztBQUN0QyxZQUFNLGdCQUErQixNQUFNLDJCQUFjLEtBQUssS0FBSyxRQUFRLEtBQUssS0FBSyxRQUFRO0FBQzdGLFlBQU0sQ0FBRSxTQUFTLGFBQWMsTUFBTSxxQkFBUSxLQUFLLGVBQWUsS0FBSyxRQUFRO0FBQzlFLFlBQU0sUUFBUSxNQUFNLG1CQUFNLEtBQUs7QUFFL0IsVUFBSSxDQUFDO0FBQVcsY0FBTSxJQUFJLG1DQUF1QixRQUFRLEtBQUssS0FBSyxRQUFRO0FBQzNFLFVBQUksZ0JBQWdCO0FBQ3BCLGlCQUFXLGNBQWEsUUFBUSxZQUFZO0FBQzFDLG1CQUFXLGtCQUFrQixDQUFDLGdCQUFnQixvQkFBK0M7QUFDM0YsZ0JBQU0sZUFBZSxXQUFVLFNBQVM7QUFFeEMscUJBQVcsY0FBYyxhQUFhLFVBQVU7QUFDOUMsZ0JBQUksV0FBVyxNQUFNLFNBQVMsTUFBTTtBQUNsQyxvQkFBTSxXQUFXLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDL0MsMkJBQWEsSUFBSSxXQUFXLFdBQVcseUJBQVksZUFBZSxZQUFZO0FBQzlFLG1CQUFLLFFBQVEsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXO0FBQUE7QUFDMUQsOEJBQWdCO0FBQUE7QUFHbEIsZ0JBQUksV0FBVyxNQUFNLFNBQVMsTUFBTTtBQUNsQyxvQkFBTSxXQUFXLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDL0MsMkJBQWEsSUFBSSxXQUFXLFdBQVcseUJBQVksZUFBZSxZQUFZO0FBQzlFLG1CQUFLLFFBQVEsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXO0FBQUE7QUFDMUQsOEJBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNeEIsVUFBSSxlQUFlO0FBQ2pCLGNBQU0sZ0JBQWdCLE1BQU0sMEJBQWEsTUFDdkM7QUFBQSxVQUNFO0FBQUEsVUFDQSxRQUFRLEtBQUssUUFBUTtBQUFBLFVBQ3JCLGFBQWEsQ0FBQyxLQUFLLFFBQVE7QUFBQSxXQUU3QixPQUFPLFdBQVc7QUFDaEIsZUFBSyxRQUFRLE9BQU8sTUFBTTtBQUMxQixnQkFBTSxRQUFRLFFBQVEsQ0FBRSxPQUFPO0FBQUE7QUFHbkMsZUFBTyxjQUFjO0FBQUEsYUFDaEI7QUFDTCxhQUFLLFFBQVEsT0FBTyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBN0N2QixFQURULFdBQ1MsUUFBUSxDQUFDLENBQUM7QUFEbkIsTUFBTyxjQUFQOzs7QUZFQSxNQUFNLFNBQWlCO0FBQUEsSUFDckIsVUFBVSxDQUFDLGVBQU87QUFBQTtBQUdwQixNQUFPLGtCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
