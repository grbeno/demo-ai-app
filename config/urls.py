from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import MyTokenObtainPairView


urlpatterns = [
    
    # Admin
    path('admin/', admin.site.urls),
    
    # User model
    #path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    
    # Todos app
    path('', include('api.urls')),

    # JWT tokens
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]
