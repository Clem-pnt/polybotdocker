const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const yaml = require('js-yaml');
const dotenv = require('dotenv');

documentHooks();

function documentHooks() {
  const gitignorePath = path.resolve(__dirname, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    const ignoreContent = `node_modules\r\n.env\r\n`; // Ignore global node_modules and .env
    fs.writeFileSync(gitignorePath, ignoreContent, { encoding: 'utf-8' });
  }
}

function loadConfiguration() {
  const configPath = path.resolve(__dirname, 'bots.yml');
  if (!fs.existsSync(configPath)) {
    console.error('Le fichier bots.yml est introuvable.');
    process.exit(1);
  }
  return yaml.load(fs.readFileSync(configPath, 'utf8'));
}

function loadEnv(envPath) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}

function runBot(botName) {
  const config = loadConfiguration();
  const botConfig = config.bots.find((bot) => bot.name === botName);

  if (!botConfig) {
    console.error(`Bot "${botName}" introuvable dans bots.yml.`);
    process.exit(1);
  }

  launchBot(botConfig, config);
}

function runAllBots() {
  const config = loadConfiguration();
  const bots = config.bots;

  if (!bots || bots.length === 0) {
    console.error('Aucun bot configuré dans bots.yml.');
    process.exit(1);
  }

  console.log(`\n🚀 Lancement de ${bots.length} bot(s)...\n`);

  const runningBots = [];

  for (const botConfig of bots) {
    const child = launchBot(botConfig, config);
    runningBots.push({ name: botConfig.name, process: child });
  }

  console.log(`\n✅ ${bots.length} bot(s) lancé(s) avec succès!\n`);
  console.log('💡 Appuyez sur Ctrl+C pour arrêter tous les bots.\n');

  // Gestion de l'arrêt gracieux
  process.on('SIGINT', () => {
    console.log('\n\n⏹️  Arrêt des bots...');
    for (const bot of runningBots) {
      if (bot.process && !bot.process.killed) {
        bot.process.kill();
      }
    }
    process.exit(0);
  });
}

function launchBot(botConfig, config) {
  if (config.defaultEnvironment) {
    loadEnv(path.resolve(__dirname, config.defaultEnvironment));
  }

  if (botConfig.envFile) {
    loadEnv(path.resolve(__dirname, botConfig.envFile));
  }

  // Si entry ne contient pas de "/" ou "\\", on considère que c'est un simple nom de fichier
  // On le place automatiquement dans bots/{botName}/
  let entryPath = botConfig.entry;
  if (!entryPath.includes('/') && !entryPath.includes('\\')) {
    entryPath = `bots/${botConfig.name}/${entryPath}`;
  }

  entryPath = path.resolve(__dirname, entryPath);
  if (!fs.existsSync(entryPath)) {
    console.error(`Fichier d'entrée introuvable pour ${botConfig.name}: ${entryPath}`);
    return null;
  }

  if (!botConfig.envTokenKey) {
    console.error(`La configuration du bot "${botConfig.name}" doit définir "envTokenKey" dans bots.yml.`);
    return null;
  }

  const botToken = process.env[botConfig.envTokenKey];
  if (!botToken) {
    console.error(`La variable d'environnement ${botConfig.envTokenKey} est absente ou vide pour ${botConfig.name}.`);
    return null;
  }

  // Si workingDirectory n'est pas défini, on l'auto-génère: bots/{botName}
  const workingDirectory = botConfig.workingDirectory || `bots/${botConfig.name}`;

  const spawnEnv = { ...process.env, DISCORD_TOKEN: botToken, BOT_NAME: botConfig.name };

  if (botConfig.intents && botConfig.intents.length > 0) {
    spawnEnv.BOT_INTENTS = botConfig.intents.join(',');
  }

  if (botConfig.usesSharedNodeModules) {
    spawnEnv.NODE_PATH = path.resolve(__dirname, 'node_modules');
  }

  const child = spawn('node', [entryPath], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, workingDirectory),
    env: spawnEnv,
  });

  child.on('error', (error) => {
    console.error(`Erreur lors de l'exécution du bot ${botConfig.name}:`, error);
  });

  child.on('close', (code) => {
    console.log(`\n🛑 Bot ${botConfig.name} terminé avec le code ${code}.`);
  });

  return child;
}

const [,, command, botName] = process.argv;

if (command === 'run' && botName) {
  runBot(botName);
} else if (command === 'runAll' || !command) {
  runAllBots();
} else {
  console.log('📖 Usage:\n');
  console.log('  Lancer un bot spécifique:');
  console.log('    node manager.js run <bot-name>\n');
  console.log('  Lancer tous les bots (par défaut):');
  console.log('    node manager.js\n');
  console.log('  Exemples:');
  console.log('    node manager.js run kairox');
  console.log('    node manager.js\n');
}