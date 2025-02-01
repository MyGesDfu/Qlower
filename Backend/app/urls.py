from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, TransactionCreateView, balance_comptable, destroy

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('app/', include(router.urls)),
    path('app/transactions/', TransactionCreateView.as_view(), name='transaction-create'),
    path('app/transactions/<int:pk>/', destroy, name='transaction-delete'),
    path('app/balance-comptable/<int:annee>/', balance_comptable, name='balance_comptable'),
]