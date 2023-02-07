class MultiPlayerSocket{

	constructor(playground){
	this.playground=playground;
	this.ws=new WebSocket("wss://app4576.acapp.acwing.com.cn/wss/multiplayer/");//建立多人模式的 wss连接请求
	this.start();
	
 }
	start()
	{
		console.log("test");
	this.receive();
	}
	//从前端接受wws协议
	receive(){

		console.log("test1");

		this.ws.onmessage=function(e)
		{
			let data=JSON.parse(e.data);//将json变成字典
			console.log(data);
		};
	}
	send_create_player(username,photo)//创建成功向后端发送json
	{
		let outer=this;
		this.ws.send(JSON.stringify({
			'event':"create player",
			'uuid':outer.uuid,
			'username':username,
			'photo':photo,

		}));
	}

}
