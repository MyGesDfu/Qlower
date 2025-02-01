from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
import csv
from .models import Transaction, User
from .serializers import TransactionSerializer, UserSerializer
from datetime import datetime

# Vue pour créer une transaction
class TransactionCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

# Vue pour gérer les transactions
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    # Vue pour supprimer une transaction
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Vue pour générer la balance comptable
    def balance_comptable(self, request, annee):
        # Filtrer les transactions pour l'année spécifiée
        transactions = Transaction.objects.filter(date__year=annee)
        
        # Calculer le total par catégorie
        categories = {}
        for t in transactions:
            if t.categorie not in categories:
                categories[t.categorie] = 0
            categories[t.categorie] += t.montant
        
        # Créer une réponse HTTP avec un fichier CSV
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="balance_comptable_{annee}.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['Catégorie', 'Total'])
        for categorie, total in categories.items():
            writer.writerow([categorie, total])
        
        return response

# Vue pour créer un utilisateur
class UserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

# Vue pour gérer les utilisateurs
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def authenticate_by_email(request, email=None, password=None):
    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            return user
        return None
    except User.DoesNotExist:
        return None

# Vue pour connecter un utilisateur

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        # Authentification par email
        user = authenticate_by_email(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            return Response({"message": "Connexion réussie", "user": user.email}, status=status.HTTP_200_OK)
        
        return Response({"message": "Identifiants invalides"}, status=status.HTTP_400_BAD_REQUEST)

