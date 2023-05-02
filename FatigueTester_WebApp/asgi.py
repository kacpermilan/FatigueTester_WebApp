"""
ASGI config for FatigueTester_WebApp project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FatigueTester_WebApp.settings')

# Asynchronous Server Gateway Interface for Python Web Applications
application = get_asgi_application()
