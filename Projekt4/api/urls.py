from django.urls import path
from rest_framework.routers import SimpleRouter


from .views import UserViewSet, BookViewSet


router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('', BookViewSet, basename='books')

urlpatterns = router.urls

