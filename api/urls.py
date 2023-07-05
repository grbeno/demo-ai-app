from django.urls import path
from .views import ListTodo, React


urlpatterns = [
    path('', React.as_view(), name='frontend'),  # turn off for react development
    path('api/', ListTodo.as_view()),
]