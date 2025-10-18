# PolyBotDocker 🤖

Un système de gestion multi-bots Discord modulaire et extensible. Lancez plusieurs bots Discord à partir d'une seule configuration centralisée et Docker.

## ✨ Caractéristiques

- 🎯 **Gestion centralisée** : Lancez plusieurs bots depuis une unique configuration
- 🔧 **Modulaire** : Ajoutez facilement de nouveaux bots
- ⚡ **Efficace** : Support pour les dépendances partagées
- 📝 **Configurable** : Un seul fichier `bots.yml` pour tous les bots
- 🔐 **Sécurisé** : Gestion appropriée des tokens et secrets
- 🐳 **Prêt Docker** : Prêt pour le déploiement conteneurisé

## 🚀 Démarrage rapide

### Prérequis
- Node.js 16+ 
- npm
- Git

### Installation

```powershell
# 1. Cloner le projet
git clone https://github.com/Clem-pnt/polybotdocker.git
cd polybotdocker

# 2. Configurer le fichier .env
# Éditez .env et ajoutez vos tokens Discord

# 3. Créer votre premier bot
# Créez un dossier dans ./bots/ avec votre bot
mkdir bots/mon-bot
cd bots/mon-bot
npm init -y
npm install discord.js
# Créez votre start.js
cd ../..

# 4. Configurer dans bots.yml (voir section ci-dessous)

# 5. Lancer le bot
node manager.js run mon-bot
```

Pour plus de détails, consultez [ADD_BOT.md](./ADD_BOT.md)

## 📚 Créer votre premier bot

Vous pouvez créer votre bot **exactement comme vous le souhaitez** ! Le seul requirement : avoir un `start.js` qui démarre le client Discord.

**Workflow :**
1. Créez votre structure dans `./bots/mon-bot/`
2. Installez discord.js : `npm install discord.js`
3. Créez un `start.js` qui démarre votre bot
4. Configurez dans `bots.yml`
5. Ajoutez le token dans `.env`
6. Lancez ! : `node manager.js run mon-bot`

Pour plus de détails → [📖 ADD_BOT.md](./ADD_BOT.md)

### Configuration dans `bots.yml`

```yaml
bots:
  - name: mon-bot
    entry: start.js           # Nom du fichier ou chemin complet
    envTokenKey: MON_BOT_TOKEN
```

Voilà ! C'est tout ce qui est nécessaire. Les autres paramètres sont optionnels :

```yaml
bots:
  - name: mon-bot
    entry: start.js                    # Obligatoire
    envTokenKey: MON_BOT_TOKEN         # Obligatoire
    usesSharedNodeModules: false       # Optionnel (défaut: false)
    intents:                           # Optionnel
      - Guilds
      - GuildMessages
      - MessageContent
```

### Token dans `.env`
```env
MON_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
```

## 🎮 Commandes

### Lancer un bot spécifique
```powershell
node manager.js run mon-bot
node manager.js run autre-bot
```

### Lancer tous les bots
```powershell
npm start
```

## 📁 Structure du projet

```
PolyBotDocker/
├── .env                      # Configuration (tokens Discord)
├── .gitignore                # Fichiers ignorés par Git
├── bots.yml                  # Configuration centrale de tous les bots
├── manager.js                # Gestionnaire et lanceur de bots
├── ADD_BOT.md                # Guide pour créer de nouveaux bots
├── README.md                 # Ce fichier
│
└── bots/                     # Dossier contenant vos bots
    ├── mon-bot/              # Bot 1
    │   ├── start.js          # Point d'entrée
    │   ├── package.json      # Dépendances
    │   └── ...               # Votre code
    ├── autre-bot/            # Bot 2
    │   ├── start.js
    │   ├── package.json
    │   └── ...
    └── ...
```

## 🎓 Structure d'un bot

Vous avez **la liberté totale** sur la structure ! La seule obligation : avoir un `start.js` qui démarre le bot.

**Structure minimaliste:**
```
bots/mon-bot/
├── start.js                  # Point d'entrée (obligatoire)
└── package.json              # Dépendances
```

**Structure avancée:**
```
bots/mon-bot/
├── start.js                  # Point d'entrée
├── package.json
├── src/
│   ├── client.js
│   ├── commands/
│   ├── events/
│   └── utils/
└── config.json               # Configuration locale
```

Consultez [ADD_BOT.md](./ADD_BOT.md) pour plus d'exemples.

## 🔧 Configuration avancée

### Intents discord.js

Dans `bots.yml`, configurez les intents selon vos besoins :

```yaml
intents:
  - Guilds
  - GuildMessages
  - MessageContent
  - GuildMembers
  - GuildVoiceStates
  - GuildPresences
```

**Intents disponibles :**
- Guilds
- GuildMembers
- GuildBans
- GuildEmojisAndStickers
- GuildIntegrations
- GuildWebhooks
- GuildInvites
- GuildVoiceStates
- GuildPresences
- GuildMessages
- GuildMessageReactions
- GuildMessageTyping
- DirectMessages
- DirectMessageReactions
- DirectMessageTyping
- MessageContent
- GuildScheduledEvents
- AutoModerationConfiguration
- AutoModerationExecution

### Ajouter un deuxième bot

Répétez simplement le processus :
```powershell
mkdir bots/bot2
cd bots/bot2
npm init -y
npm install discord.js
# Créez votre start.js
cd ../..
```

Puis ajoutez à `bots.yml` :
```yaml
  - name: bot2
    entry: start.js
    envTokenKey: BOT_2_TOKEN
```

Et lancez-le :
```powershell
node manager.js run bot2
```

## 🐳 Utiliser avec Docker

Le projet est conçu pour fonctionner en Docker. Voir le `Dockerfile` pour les détails.

```bash
docker build -t polybot .
docker run -e MON_BOT_TOKEN=xxx -e AUTRE_BOT_TOKEN=yyy polybot
```

## 🔐 Sécurité

- ⚠️ **Ne commitez jamais** les fichiers `.env`
- 📋 Utilisez `.env.example` comme référence
- 🔄 **Régénérez les tokens** si exposés
- 🛡️ Utilisez `.gitignore` pour exclure les données sensibles

## 📞 Support

Pour des questions ou problèmes :
1. Consultez [ADD_BOT.md](./ADD_BOT.md) pour créer des bots
2. Vérifiez votre `bots.yml` et `.env`
3. Ouvrez une issue sur GitHub

## 📚 Ressources

- [discord.js Documentation](https://discord.js.org/)
- [Discord API](https://discord.com/developers/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

## 📝 Licence

À définir selon vos préférences.

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :
1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez votre branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

**Créez vos super bots Discord ! 🚀**