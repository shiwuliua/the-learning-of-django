from django.http import JsonResponse
from game.models.player.player import Player #导入数据库
def getinfo_acapp(request):#acwing端口
    player=Player.objects.all()[0]
    return JsonResponse({
        'result':"success",
        'username':player.user.username,
        'photo':player.photo,
        })

def getinfo_web(request):#处理web端请求
    user = request.user
    if not user.is_authenticated:#判断用户是否登陆
        return JsonResponse({
            'result':"未登陆",
            })
    else :
        player=Player.objects.all()[0] #第0个玩家
        return JsonResponse({
        'result':"success",
        'username':player.user.username,
        'photo':player.photo,
        })
def getinfo(request):#处理请求
    platform = request.GET.get('platform')
    if platform == "ACAPP":
        return getinfo_acapp(request)
    elif platform == "WEB":
        return getinfo_web(request)

