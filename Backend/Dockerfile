# Utilisation de l'image officielle Python
FROM python:3.11

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier des dépendances
COPY requirements.txt .

# Installer les dépendances système et Python du projet
RUN apt-get update && \
    apt-get install -y netcat-openbsd postgresql-client && \
    pip install --no-cache-dir -r requirements.txt dj-database-url python-dotenv django-cors-headers

# Copier le reste du projet
COPY . .

# Copier et donner les droits d'exécution au script d'entrée
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exposer le port de Django
EXPOSE 8000

# Lancer le script d'initialisation
ENTRYPOINT [ "sh", "/entrypoint.sh" ]
