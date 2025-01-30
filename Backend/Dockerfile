# Utilisation de l'image officielle Python
FROM python:3.11

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY requirements.txt .

# Installer Netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Installation des dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du projet
COPY . .
COPY ./entrypoint.sh /entrypoint.sh
# Donner les droits d'exécution à l'entrée du conteneur
RUN chmod +x /entrypoint.sh

# Exposer le port de Django (par défaut 8000)
EXPOSE 8000

# Exécuter le script d'initialisation
ENTRYPOINT [ "sh" , "/entrypoint.sh" ]

