const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Ajoute le dossier parent dans les chemins surveillés
config.watchFolders = [workspaceRoot];

// Résout les modules du parent avant ceux de node_modules local
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Permet d'importer depuis la racine
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
