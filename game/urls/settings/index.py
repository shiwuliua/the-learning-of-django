from django.urls import path,include
from game.views.settings.getinfo import getinfo#引入请求
from game.views.settings.login import signin
from game.views.settings.logout import signout
from game.views.settings.register import register

#路由
urlpatterns=[
    path("getinfo/",getinfo,name="settings_getfino"),
    path("login/",signin,name="settings_login"),
    path("logout/",signout,name="settings_signout"),
    path("register/",register,name="settings_register"),
    path("acwing/",register,name="settings_acwing"),
    path("acwing/",include("game.urls.settings.acwing.index")),
 ]

