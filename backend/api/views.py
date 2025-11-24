from django.shortcuts import render
from .models import Car, BookCar
from .serializers import CarSerializers, BookCarSerializer
from rest_framework import viewsets, permissions
from rest_framework import generics
from .models import BookCar

# Create your views here.
class CarViewSet (viewsets.ModelViewSet):
    serializer_class = CarSerializers
    permission_classes = [permissions.AllowAny]
    queryset = Car.objects.all()

class BookCarViewSet (viewsets.ModelViewSet):
    serializer_class = BookCarSerializer
    permission_classes = [permissions.AllowAny]
    queryset = BookCar.objects.all()

class BookCarDetail(generics.RetrieveUpdateAPIView):
    queryset = BookCar.objects.all()
    serializer_class = BookCarSerializer
