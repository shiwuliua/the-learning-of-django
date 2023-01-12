from django.http import HttpResponse
def index(request):
    line1='<h1 style="text-align: center">五柳</h1>'
    line2='<img src="https://inews.gtimg.com/newsapp_bt/0/13488268113/1000"width=2000>'
    return HttpResponse(line1+line2)
