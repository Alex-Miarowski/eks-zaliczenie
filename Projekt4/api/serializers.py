from django.contrib.auth import get_user_model
from rest_framework import serializers

from books.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'subtitle', 'author', 'isbn')


class UserSerializer(serializers.ModelSerializer): # new
    class Meta:
        model = get_user_model()
        fields = ('id', 'username',)

