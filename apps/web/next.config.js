/** @type {import('next').NextConfig} */
const path = require("path");
const fs = require("fs");

// Try to find the shared package - check multiple possible locations
let sharedPath = null;
const possiblePaths = [
  path.resolve(__dirname, "../../packages/shared"), // From apps/web
  path.resolve(__dirname, "../packages/shared"), // If building from root
  path.resolve(process.cwd(), "packages/shared"), // From current working directory
];

for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath) && fs.existsSync(path.join(possiblePath, "dist"))) {
    sharedPath = possiblePath;
    break;
  }
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fountain/shared"],
  // Ensure webpack can resolve the shared package
  webpack: (config) => {
    if (sharedPath) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@fountain/shared": sharedPath,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

