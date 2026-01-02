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
      console.log(`Found shared package at: ${sharedPath}`);
      break;
    }
  }
}

if (!sharedPath) {
  console.warn("Warning: Could not find @fountain/shared package. Build may fail.");
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fountain/shared"],
  // Ensure webpack can resolve the shared package
  webpack: (config, { isServer }) => {
    // Always add the alias - point directly to the dist folder for resolution
    const resolvedPath = sharedPath || path.resolve(__dirname, "../../packages/shared");
    const distPath = path.join(resolvedPath, "dist");
    
    // Point alias to dist folder directly, or fallback to package root
    const aliasPath = fs.existsSync(distPath) ? distPath : resolvedPath;
    
    config.resolve.alias = {
      ...config.resolve.alias,
      "@fountain/shared": aliasPath,
    };
    
    // Also add the package root to modules for package.json resolution
    if (!config.resolve.modules) {
      config.resolve.modules = ["node_modules"];
    }
    const packagesDir = path.resolve(resolvedPath, "..");
    if (!config.resolve.modules.includes(packagesDir)) {
      config.resolve.modules.push(packagesDir);
    }
    
    // Add the shared package directory itself to modules
    if (!config.resolve.modules.includes(resolvedPath)) {
      config.resolve.modules.push(resolvedPath);
    }
    
    return config;
  },
};

module.exports = nextConfig;

