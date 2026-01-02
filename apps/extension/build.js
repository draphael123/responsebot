const fs = require("fs");
const path = require("path");

// Copy static files to dist
const staticFiles = [
  "manifest.json",
  "src/sidepanel.html",
  "src/icons",
];

const distDir = path.join(__dirname, "dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy manifest
fs.copyFileSync(
  path.join(__dirname, "manifest.json"),
  path.join(distDir, "manifest.json")
);

// Copy sidepanel.html
fs.copyFileSync(
  path.join(__dirname, "src/sidepanel.html"),
  path.join(distDir, "sidepanel.html")
);

// Copy icons directory
const iconsSrc = path.join(__dirname, "src/icons");
const iconsDest = path.join(distDir, "icons");
if (fs.existsSync(iconsSrc)) {
  if (!fs.existsSync(iconsDest)) {
    fs.mkdirSync(iconsDest, { recursive: true });
  }
  const iconFiles = fs.readdirSync(iconsSrc);
  iconFiles.forEach((file) => {
    fs.copyFileSync(
      path.join(iconsSrc, file),
      path.join(iconsDest, file)
    );
  });
}

console.log("Static files copied to dist/");

