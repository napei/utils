/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-utils",
factory: function (require) {
var plugin=(()=>{var f=Object.create,r=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var P=t=>r(t,"__esModule",{value:!0});var l=t=>{if(typeof require!="undefined")return require(t);throw new Error('Dynamic require of "'+t+'" is not supported')};var k=(t,o)=>{for(var e in o)r(t,e,{get:o[e],enumerable:!0})},y=(t,o,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of h(o))!x.call(t,i)&&i!=="default"&&r(t,i,{get:()=>o[i],enumerable:!(e=g(o,i))||e.enumerable});return t},m=t=>y(P(r(t!=null?f(w(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var F={};k(F,{default:()=>C});var d=m(l("@yarnpkg/cli")),n=m(l("@yarnpkg/core")),a=m(l("@yarnpkg/fslib")),L="node_modules",j="yarn.lock",s=class extends d.BaseCommand{async execute(){let o=await n.Configuration.find(this.context.cwd,this.context.plugins),{project:e}=await n.Project.find(o,this.context.cwd),i=await n.Cache.find(o);if(o.get("nodeLinker")){let c=a.ppath.join(e.cwd,L);await a.xfs.removePromise(c,{recursive:!0})}let u=a.ppath.join(e.cwd,j);return await a.xfs.removePromise(u),(await n.StreamReport.start({configuration:o,stdout:this.context.stdout,includeLogs:!this.context.quiet},async c=>{await e.install({cache:i,report:c})})).exitCode()}};s.paths=[["regen"]];var p=s;var v={commands:[p]},C=v;return F;})();
return plugin;
}
};
