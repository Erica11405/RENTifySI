from rest_framework import serializers
from .models import Car, BookCar

class CarSerializers(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'price', 'capacity', 'image']

class BookCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCar
        fields = [
            'id', 'fullName', 'email', 'car', 'withDriver','pickup_date', 'return_date', 'status', 'total_price', 'payment_mode', 'image']