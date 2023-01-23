# Aplikacja ToDo

## Django

### Możliwości:

    Konto:
    - stworzenie konta [Nick, Imię, email, hasło]
    - logowanie na konto
    - edycja danych konta [wszystkie dane z procesu tworzenia, dodatkowo można dodać zdjęcie oraz datę urodzenia]
    - logowanie za pomocą konta facebook lub google
    - różne poziomy dostępu

    "Biblioteka":
    - dodawanie książek do spisu [tytuł, podtytuł, autor, numer isbn]
    - podejrzenie każdej książki przez API na stronie lub w formacie JSON
    - Możliwość podejrzenia listy użytkowników w przypadku posiadania uprawnień administratorskich
    - licznik wizyt na podstronie

Wszystkie endpointy z możliwościami:

    urlpatterns = [

    path('admin/', admin.site.urls),

    path('account/', include('account.urls')),

    path('books/', include('books.urls')),

    path('social-auth/', include('social_django.urls', namespace='social')),

    path('api/', include('api.urls')),

    path('api-auth/', include('rest_framework.urls')),

    path('visits/', visitsCounter),

    path('docs/', include_docs_urls(title=API_TITLE,

]
