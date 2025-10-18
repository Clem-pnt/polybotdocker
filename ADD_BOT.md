# 🎨 Guide: Créer un Bot Personnalisé

La template est **optionnelle**. Vous pouvez structurer votre bot **exactement comme vous le souhaitez** !

## ✨ Le seul contrat :

Votre bot **doit** :
1. ✅ Avoir un fichier d'entrée (ex: `start.js`)
2. ✅ Exporter le client Discord ou démarrer correctement
3. ✅ Lire le token depuis `process.env.DISCORD_TOKEN`
4. ✅ Pouvoir être lancé avec : `node start.js`

## 🚀 Exemple: Bot ultra-simple

```javascript
// start.js
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Bot connecté: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
```

C'est tout ce dont vous avez besoin ! ✨

## 📁 Structure personnalisée example

Vous pouvez faire ceci :

```
bots/mon-bot/
├── start.js              # Fichier d'entrée
├── commands/
│   ├── hello.js
│   └── stats.js
├── utils/
│   └── logger.js
├── package.json
└── .env                  # Token local (optionnel)
```

**Ou ceci :**

```
bots/mon-bot/
├── index.js              # Fichier d'entrée
├── src/
│   ├── client.js
│   ├── handlers/
│   └── events/
└── package.json
```

**Ou n'importe quelle autre structure !**

## 🔧 Configuration dans `bots.yml`

```yaml
bots:
  - name: mon-bot
    entry: start.js                   # Nom du fichier ou chemin complet
    envTokenKey: DISCORD_TOKEN
```

Avec paramètres optionnels :
```yaml
bots:
  - name: mon-bot
    entry: start.js
    envTokenKey: DISCORD_TOKEN
    usesSharedNodeModules: false      # false = dépendances locales
    intents:                           # Intents discord.js optionnels
      - Guilds
      - GuildMessages
      - MessageContent
```

## 📦 Dépendances: Partagées ou Locales ?

### Option 1: Dépendances partagées (recommandé pour tester)
```yaml
usesSharedNodeModules: true
```
- Utilise les `node_modules/` global (plus rapide)
- Tous les bots partagent les mêmes dépendances

### Option 2: Dépendances locales (recommandé en production)
```yaml
usesSharedNodeModules: false
```
- Chaque bot a son propre `node_modules/`
- Plus d'isolation, mais plus lourd

## 🎯 Workflow: Du localhost à production

### 1️⃣ Développement local
```bash
cd mon-bot
npm install
node start.js
# Ton bot tourne en localhost
```

### 2️⃣ Préparation pour le zip
```bash
# Ton dossier doit avoir:
# - start.js
# - package.json
# - tout ton code
```

### 3️⃣ Mise en place
```bash
# 1. Crée un ZIP de ton dossier
# 2. Mets-le dans ./bots/
# 3. Décompresse-le
# 4. Ajoute une entrée dans bots.yml
# 5. Configure le token dans .env
# 6. Lance:
node manager.js run mon-bot
```

## 🐳 Frameworks & Outils

Vous pouvez utiliser **n'importe quel outil** :

- ✅ `discord.js` (recommandé)
- ✅ `discord-interactions`
- ✅ `eris`
- ✅ Votre propre wrapper
- ✅ Même du TypeScript (compilé en JS)

## 💡 Conseils

- **Testez localement d'abord** avant de mettre en zip
- **Incluez un `package.json`** avec vos dépendances
- **Documentez votre structure** pour les autres
- **Utilisez `.env` locaux** pour les configs sensibles par bot

## ❓ Questions ?

Consultez les examples dans `.template/` pour voir la structure recommandée, mais n'oubliez pas : **c'est juste un example**, pas une obligation !