# Utilisation de l'image Node.js officielle
FROM node:20

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port 3000
EXPOSE 5173

# Démarrer l'application en mode développement avec un accès réseau
CMD ["npm", "run", "dev", "--", "--host"]
