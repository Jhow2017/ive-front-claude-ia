// Ambient declarations for non-code side-effect imports (CSS, etc.).
// Next/Tailwind handle these at build time; this just keeps the
// TypeScript language service happy with `import "./globals.css"`.
declare module "*.css";
