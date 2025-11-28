from rest_framework import serializers
from .models import Car, BookCar

class CarSerializers(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'price', 'capacity', 'image']

class BookCarSerializer(serializers.ModelSerializer):
    
    car_name = serializers.CharField(source='car.name', read_only=True)
    class Meta:
        model = BookCar
        fields = [
            'id', 'fullName', 'email', 'car', 'car_name', 'withDriver','pickup_date', 'return_date', 'status', 'total_price', 'payment_mode', 'image']