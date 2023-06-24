/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { appDir: true } ,
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
    babel: {
        presets: [
          [
            "next/babel",
            {
              "preset-env": {},
              "preset-react": {},
            },
          ],
        ],
    },
}

module.exports = nextConfig
