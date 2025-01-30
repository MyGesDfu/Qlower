from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('app/', include(router.urls)),
    path('app/balance-comptable/<int:year>/', TransactionViewSet.as_view({'get': 'generate_balance'})),
]