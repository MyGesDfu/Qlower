from django.db import models

class Transaction(models.Model):
    CATEGORIE_CHOICES = [
        ('Ventes', 'Ventes'),
        ('Achats', 'Achats'),
        ('Salaires', 'Salaires'),
    ]
    date = models.DateTimeField()
    categorie = models.CharField(max_length=50, choices=CATEGORIE_CHOICES)
    montant = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.date} - {self.categorie} - {self.montant}"

class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.username} - {self.email} - {self.password}"