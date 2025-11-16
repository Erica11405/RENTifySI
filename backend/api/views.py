from django.shortcuts import render
from .models import Car, BookCar
from .serializers import CarSerializers, BookCarSerializers
from rest_framework import viewsets, permissions

# Create your views here.
class CarViewSet (viewsets.ModelViewSet):
    serializer_class = CarSerializers
    permission_classes = [permissions.AllowAny]
    queryset = Car.objects.all()

class BookCarViewSet (viewsets.ModelViewSet):
    serializer_class = BookCarSerializers
    permission_classes = [permissions.AllowAny]
    queryset = BookCar.objects.all()