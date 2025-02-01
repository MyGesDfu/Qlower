import os
import dj_database_url
from dotenv import load_dotenv

# Charger le fichier .env
load_dotenv()

# Vérifier si DATABASE_URL est bien chargé
database_url = os.getenv('DATABASE_URL')
print("DATABASE_URL:", database_url)

# Configurer la base de données
DATABASES = {
    'default': dj_database_url.config(default=database_url)
}
