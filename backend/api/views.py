from django.shortcuts import render
from .models import Car, BookCar
from .serializers import CarSerializers, BookCarSerializer
from rest_framework import viewsets, permissions, generics

class CarViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializers
    permission_classes = [permissions.AllowAny]
    queryset = Car.objects.all()

class BookCarViewSet(viewsets.ModelViewSet):
    serializer_class = BookCarSerializer
    permission_classes = [permissions.AllowAny]
    queryset = BookCar.objects.all()

    def perform_update(self, serializer):
        instance = serializer.save()

        if instance.status == "Accepted":
            try:
                car = Car.objects.get(name=instance.car)
                car_price = float(car.price)
                driver_fee = 800

                rental_days = (instance.return_date - instance.pickup_date).days
                rental_days = max(1, rental_days)

                if instance.withDriver == "withDriver":
                    total = (car_price * rental_days) + (driver_fee * rental_days)
                else:
                    total = car_price * rental_days

                instance.total_price = total
                instance.save()

            except Car.DoesNotExist:
                pass

class BookCarDetail(generics.RetrieveUpdateAPIView):
    queryset = BookCar.objects.all()
    serializer_class = BookCarSerializer
