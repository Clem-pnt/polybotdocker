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
- npm ou yarn
- Git

### Installation

```powershell
# 1. Cloner le projet
git clone https://github.com/YOUR_USERNAME/PolyBotDocker.git
cd PolyBotDocker

# 2. Copier et configurer le fichier .env
Copy-Item .env.example .env
# Éditez .env et ajoutez vos tokens Discord

# 3. Créer votre premier bot
Copy-Item -Path ".template" -Destination "bots/mon-bot" -Recurse

# 4. Installer les dépendances
Set-Location bots/mon-bot
npm install
Set-Location ../..

# 5. Configurer dans bots.yml (voir section ci-dessous)

# 6. Lancer le bot
node manager.js run mon-bot
```

Pour un guide complet, consultez [SETUP_GITHUB.md](./SETUP_GITHUB.md)

## 📚 Créer votre premier bot

### Option 1️⃣ : Utiliser la template (recommandé pour débuter)

```powershell
# 1. Dupliquer la template
Copy-Item -Path ".template" -Destination "bots/mon-bot" -Recurse
cd bots/mon-bot
npm install
cd ../..

# 2. Configurer dans bots.yml (voir section Configuration)

# 3. Ajouter le token dans .env
# MON_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE

# 4. Lancer
node manager.js run mon-bot
```

### Option 2️⃣ : Votre propre structure (flexibilité totale)

Vous pouvez créer votre bot **exactement comme vous le souhaitez**. Le seul requirement : avoir un `start.js` qui démarre le client Discord.

**Workflow :**
1. Développez votre bot en localhost
2. Zippez le dossier complet
3. Mettez-le dans `./bots/`
4. Décompressez-le
5. Configurez dans `bots.yml`
6. Lancez !

Pour plus de détails → [📖 CUSTOM_BOT_GUIDE.md](./.template/CUSTOM_BOT_GUIDE.md)

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
├── .env.example              # Exemple de configuration
├── .env                       # ⚠️ Ne pas commiter
├── bots.yml                  # Configuration centrale
├── manager.js                # Gestionnaire de bots
├── package.json              
│
├── .template/                # Template vierge pour nouveaux bots
│   ├── start.js              # Point d'entrée
│   ├── package.json          # Dépendances
│   ├── config.example.json
│   ├── commands/             # Vos commandes slash
│   ├── events/               # Vos event listeners
│   └── utils/                # Fonctions utilitaires
│
└── bots/                     # Vos bots créés
    ├── mon-bot/              # Bot 1 (copie de .template)
    ├── autre-bot/            # Bot 2 (copie de .template)
    └── ...
```

## 🎓 Structure d'un bot

Vous avez **la liberté totale** sur la structure ! Voici la structure recommandée (mais optionnelle) :

```
bots/mon-bot/
├── start.js                  # Point d'entrée (obligatoire)
├── package.json              # Dépendances (recommandé)
├── config.json               # Configuration (optionnel)
├── commands/                 # Optionnel
├── events/                   # Optionnel
└── utils/                    # Optionnel
```

**La seule obligation :** avoir un `start.js` qui démarre le bot !

### Exemples de structures

**Minimaliste:**
```
bots/bot-simple/
├── start.js
└── package.json
```

**Avancée (recommandée):**
```
bots/bot-advanced/
├── src/
│   ├── client.js
│   ├── commands/
│   ├── events/
│   └── utils/
├── start.js (qui charge src/)
└── package.json
```

Pour plus de détails → [📖 CUSTOM_BOT_GUIDE.md](./.template/CUSTOM_BOT_GUIDE.md)

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
Copy-Item -Path ".template" -Destination "bots/bot2" -Recurse
npm --prefix "bots/bot2" install
```

Puis ajoutez à `bots.yml` :
```yaml
  - name: bot2
    entry: start.js
    envTokenKey: BOT_2_TOKEN
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
1. Consultez [SETUP_GITHUB.md](./SETUP_GITHUB.md)
2. Vérifiez la template dans [.template/README.md](./.template/README.md)
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