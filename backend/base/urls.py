from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.getProducts, name='products'),
    path('product/<pk>/', views.getProduct, name='product'),
]
