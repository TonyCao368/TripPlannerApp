// ============================================================
// METRO CONFIG — Required for Firebase JS SDK compatibility
// ============================================================

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
