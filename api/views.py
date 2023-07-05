from django.views.generic import TemplateView

from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Todo
from .serializers import TodoSerializer


class React(TemplateView):
    template_name = 'index.html'
    

class ListTodo(generics.ListAPIView):
    
    serializer_class = TodoSerializer
    
    def get(self, request, *args, **kwargs):
        user = request.user.id
        queryset = Todo.objects.filter(user=user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

        

# Custom TokenObtainPairView
class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = TokenObtainPairSerializer
