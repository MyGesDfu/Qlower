from rest_framework import viewsets
from .models import Transaction
from .serializers import TransactionSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
import csv
from django.http import HttpResponse
from django.db.models import Sum
from datetime import datetime

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    @action(detail=False, methods=['get'])
    def generate_balance(self, request, year):
        transactions = Transaction.objects.filter(date__year=year)
        categories = transactions.values('categorie').annotate(total=Sum('montant'))

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="balance_{year}.csv"'
        writer = csv.writer(response)
        writer.writerow(['Catégorie', 'Total'])

        for category in categories:
            writer.writerow([category['categorie'], category['total']])

        return response
