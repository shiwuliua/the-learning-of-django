from django.http import JsonResponse
from urllib.parse import quote#替换掉url里的特殊字符，防止出错
from random import randint
from django.core.cache import cache #state存到cache里

def get_state():
    res=""
    for i in range(8):
        res+=str(randint(0,9))#随机值
    return res

def apply_code(request):
    appid="4576"
    redirect_uri=quote("https://app4576.acapp.acwing.com.cn/settings/acwing/web/receive_code/")
    scope="userinfo"
    state=get_state()
    cache.set(state,True,7200)#有效期两小时 7200秒
    apply_code_url="https://www.acwing.com/third_party/api/oauth2/web/authorize/"

    return JsonResponse(
            {   
                'result':"success",
                'apply_code_url':apply_code_url + "?appid=%s&redirect_uri=%s&scope=%s&state=%s" % (appid,redirect_uri,scope,state) 
                }
            )

