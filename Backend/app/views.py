from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Transaction
from .serializers import TransactionSerializer
from django.http import HttpResponse
import csv
from datetime import datetime

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

def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    instance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Vue pour générer la balance comptable
def balance_comptable(request, annee):
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
