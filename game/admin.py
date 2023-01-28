from django.contrib import admin
#让用户名显示在后台用户数据栏
from game.models.player.player import Player
# Register your models here.
admin.site.register(Player)#注册
