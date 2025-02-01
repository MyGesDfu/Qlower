from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, TransactionCreateView, UserCreateView, UserLoginView

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('app/', include(router.urls)),
    path('app/transactions/', TransactionCreateView.as_view(), name='transaction-create'),
    path('app/transactions/<int:pk>/', TransactionViewSet.as_view({'delete': 'destroy'}), name='transaction-delete'),
    path('app/balance-comptable/<int:annee>/', TransactionViewSet.as_view({'get': 'balance_comptable'}), name='balance_comptable'),
    path('app/users/', UserCreateView.as_view(), name='user-create'),
    path('app/user/login', UserLoginView.as_view(), name='user-login'),
]
