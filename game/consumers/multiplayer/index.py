
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache
class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name=None
        for i in range(1000):#枚举房间
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name))<settings.ROOM_CAPACITY:
                self.room_name=name;
                break
        if not self.room_name:#房间不够了
            return
        await self.accept()
        if not cache.has_key(self.room_name):
            cache.set(self.room_name,[],3600)#有效期一小时
        for player in cache.get(self.room_name):#遍历所有玩家
            await self.send(text_data=json.dumps({
                'event':"create_player",
                'uuid':player['uuid'],
                'useranme':player['username'],
                'photo':player['photo'],

                }))
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def create_player(self,data):
        players=cache.get(self.room_name)
        players.append({
            'uuid':data['uuid'],
            'username':data['username'],
            'photo':data['photo']

            })#加入当前玩家
        cache.set(self.room_name,players,3600)#有效期一小时
        #将消息发送给组内的所有人
        await self.channel_player.group_send(
                self.room_name,{

                    'type':"group_create_player",
                    'event':"create_player",
                    'uuid':data['uuid'],
                    'username':data['username'],
                    'photo':data['photo'],

                    }


                )
        #接收函数 发送到前端
    async def group_create_player(self,data):
        await self.send(text_data=json.dumps(data))
    async def receive(self, text_data):
        data = json.loads(text_data)
        event=data['event']
        if event =="create_player":
            await self.create_player(data)

