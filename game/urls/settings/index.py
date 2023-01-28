from django.urls import path
from game.views.settings.getinfo import getinfo#引入请求
urlpatterns=[
    path("getinfo/",getinfo,name="settings_gitfino")

 ]

