from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, BookCarViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter ()
router.register(r'cars', CarViewSet)
router.register(r'book_car', BookCarViewSet)
urlpatterns = [
    path('',include(router.urls))
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)