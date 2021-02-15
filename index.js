const pluginSass = require("@snowpack/plugin-sass");
const path = require("path");
const picomatch = require("picomatch");

const cssResultModule = cssText => `\
import {css} from "lit-element";
export default css\`
${cssText.replace(/([$`\\])/g, "\\$1")}\`;
`;

const cssProxyModule = cssText => `\
document.head
    .appendChild(document.createElement("style"))
    .appendChild(document.createTextNode(\`
${cssText.replace(/([$`\\])/g, "\\$1")}\`));
`;

module.exports = function (snowpackConfig, pluginOptions) {
    let delegate = pluginSass(snowpackConfig, pluginOptions);
    let basedir = pluginOptions.basedir || process.cwd();
    let include = pluginOptions.include ? picomatch(pluginOptions.include) : ()=>true;
    let exclude = pluginOptions.exclude ? picomatch(pluginOptions.exclude) : ()=>false;

    function accept(filePath) {
        const relativePath = path.relative(basedir, filePath);
        return include(relativePath) && !exclude(relativePath);
    }

    return {
        name: "snowpack-plugin-css-result",
        resolve: {input: [".scss", ".sass"], output: [".js"]},
        onChange(args) {
            delegate.onChange(args);
        },
        async load({filePath, isDev}) {
            const content = await delegate.load({filePath, isDev});
            if (content) {
                return accept(filePath) ? cssResultModule(content) : cssProxyModule(content);
            }
        }
    };
};