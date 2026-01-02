/** @type {import('next').NextConfig} */
const path = require("path");
const fs = require("fs");

// Try to find the shared package - check multiple possible locations
let sharedPath = null;
const possiblePaths = [
  path.resolve(__dirname, "../../packages/shared"), // From apps/web
  path.resolve(__dirname, "../packages/shared"), // If building from root
  path.resolve(process.cwd(), "packages/shared"), // From current working directory
  path.resolve(process.cwd(), "../../packages/shared"), // From apps/web (process.cwd)
];

for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    // Check if it's a valid package (has package.json)
    if (fs.existsSync(path.join(possiblePath, "package.json"))) {
      sharedPath = possiblePath;
      break;
    }
  }
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fountain/shared"],
  // Ensure webpack can resolve the shared package
  webpack: (config, { isServer }) => {
    if (sharedPath) {
      // Add alias pointing to the package directory
      // Webpack will use package.json "main" field to resolve to dist/index.js
      config.resolve.alias = {
        ...config.resolve.alias,
        "@fountain/shared": sharedPath,
      };
      
      // Also add to resolve.modules to help with resolution
      if (!config.resolve.modules) {
        config.resolve.modules = [];
      }
      config.resolve.modules.push(path.resolve(sharedPath, ".."));
    }
    return config;
  },
};

module.exports = nextConfig;

