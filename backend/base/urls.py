from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/', views.getProducts, name='products'),
    path('product/<pk>/', views.getProduct, name='product'),
    path('users/profile/', views.getUserProfile, name='users'),
    path('users/', views.getUsers, name='users'),
]

