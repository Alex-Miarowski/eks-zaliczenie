from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets

from books.models import Book
from .permissions import IsAuthorOrReadOnly
from .serializers import BookSerializer, UserSerializer
from django.http import HttpResponse

""""
class BookAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class UserList(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
"""


class BookViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


def visitsCounter(request):
    html = HttpResponse("")
    if request.COOKIES.get('visitsCount'):
        amountOfVisits = int(request.COOKIES.get('visitsCount'))
        html = HttpResponse("<h3>Ilość twoich wizyt na stronie jest równa: </h3>" + str(amountOfVisits))
        html.set_cookie('visitsCount', amountOfVisits + 1)
    else:
        amountOfVisits = 1
        html = HttpResponse("<h3>To twoja pierwsza wizyta na stronie!</h3>")
        html.set_cookie('visitsCount', amountOfVisits)
    return html

