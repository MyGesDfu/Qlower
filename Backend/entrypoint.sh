#!/bin/sh

echo "Attente de la base de données..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Base de données prête, exécution des migrations..."
python manage.py migrate

echo "Création du superutilisateur si nécessaire..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'password')" | python manage.py shell

echo "Démarrage du serveur Django..."
exec "$@"
