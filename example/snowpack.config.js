/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        "src": "/dist",
        "public": "/"
    },
    plugins: [
        [
            "snowpack-plugin-css-result",
            {
                include:"src/components/**"
            }
        ]
    ],
};