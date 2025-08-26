const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../.."); // <- adapte si besoin

// Récupère la config de base
const config = getDefaultConfig(projectRoot);

// Ajoute le dossier parent dans les chemins surveillés (utile pour le hot reload)
config.watchFolders = [workspaceRoot];

// Résout les modules du parent avant ceux du node_modules local
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Permet d'importer depuis la racine sans collisions
config.resolver.disableHierarchicalLookup = true;

// Active Storybook avec ta config custom
module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(projectRoot, "./.storybook"),
  useJs: true,
});

