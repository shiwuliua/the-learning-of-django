from django.shortcuts import redirect #重定向
from django.core.cache import cache
import requests#请求连接
from django.contrib.auth.models import User#用户信息
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint


def receive_code(request):
    data=request.GET
    code=data.get('code')#
    state=data.get('state')
    if not cache.has_key(state):#查看redis里面有没有state
        return redirect("index")
    cache.delete(state)#删除state关键词，1对1的关系
    apply_access_token_url="https://www.acwing.com/third_party/api/oauth2/access_token/"
    params={
	    'appid':"4576",
	    'secret':"89e98655b9e1447fa33f33cb05cfcc3b",
	    'code':code

	    }
    access_token_res=requests.get(apply_access_token_url,params=params).json()
    access_token=access_token_res['access_token']
    openid=access_token_res['openid']
    players=Player.objects.filter(openid=openid);#查询这个用户是否存在
    if players.exists():#如果用户以存在，则无需重新获取信息，直接登陆即可
        login(request,players[0].user)
        return redirect("index")
    get_userinfo_url="https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params={
            "access_token":access_token,
            "openid":openid

            }
    userinfo_res=requests.get(get_userinfo_url,params=params).json()#acwing返回的资料
    username=userinfo_res['username']
    photo=userinfo_res['photo']
    while User.objects.filter(username=username).exists():
        username+=str(randint(0,9))#找到一个新用户名，为了防止acwing的用户名与网站的用户名起冲突，在后面加随机数字确保不冲突
    user=User.objects.create(username=username)#不需要密码
    player=Player.objects.create(user=user,photo=photo,openid=openid)
    login(request,user)
    print(access_token_res)
    print(code,state)
    return redirect("index")#index=根目录名字
