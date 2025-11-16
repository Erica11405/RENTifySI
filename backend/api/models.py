from django.db import models

# Create your models here.

class Car (models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.IntegerField(default=0)
    image = models.ImageField(upload_to="car_images/")

class BookCar (models.Model):
    fullName = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    car = models.CharField(max_length=255)
    pickup_date = models.DateField()
    return_date = models.DateField()