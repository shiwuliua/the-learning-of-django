from django.db import models
from django.contrib.auth.models import User
#每一次定义数据表，需要将数据表更新到数据库里
#python3 manage.py makemigrations
#python3 manege.py migrate
#执行完毕后应用的表就会执行到数据库：
class Player(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    photo = models.URLField(max_length=256,blank=True)#用户头像
    openid=models.CharField(default=" ",max_length=50,blank=True,null=True)#第三方登陆,需更新数据
    def __str__(self):#返回用户名字
        return str(self.user)
