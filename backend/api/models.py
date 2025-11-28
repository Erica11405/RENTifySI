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
    withDriver = models.CharField(max_length=50, default="withoutDriver")
    pickup_date = models.DateField()
    return_date = models.DateField()
    status = models.CharField(max_length=20, default="Pending")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_mode = models.CharField(
        max_length=20, 
        choices=[('cash', 'Cash'), ('cashless', 'Cashless')], 
        default='cash'
    )

    image = models.ImageField(upload_to="car_images/", blank=True, null=True)

    def __str__(self):
        return f"{self.fullName} - {self.car}"
