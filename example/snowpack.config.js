/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        "src": "/dist",
        "public": "/"
    },
    plugins: [
        [
            "../index.js", // in real world use "snowpack-plugin-css-result" insteand of "../hello-world.js"
            {
                include:"src/components/**"
            }
        ]
    ],
};