from django.contrib.auth import login
from django.http import JsonResponse
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data=request.GET
    username=data.get("username","").strip()#strip用于去除名字的空格
    password=data.get("password","").strip()
    password_confirm=data.get("password_confirm","").strip()
    if not username or not password:
        return JsonResponse({
        'result':"用户名和密码不能为空",
            })
    if password != password_confirm:
        return JsonResponse({
        'result':"两个密码不一致",

            })
    if User.objects.filter(username=username).exists():#用户名已经存在
        return JsonResponse({
        'result':"该用户已存在",
            })
    user=User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user,photo="https://i.hd-r.cn/282d6543b3fb43d8a87caf0e6a2f24b5.jpg")
    login(request,user)
    return JsonResponse({
        'result':"success",

        })
