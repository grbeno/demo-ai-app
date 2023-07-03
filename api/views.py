from django.views.generic import TemplateView

from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Todo
from .serializers import TodoSerializer


class React(TemplateView):
    template_name = 'index.html'

class ListTodo(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, )
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Custom TokenObtainPairView
class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = TokenObtainPairSerializer
