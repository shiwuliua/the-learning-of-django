class Player extends AcGameObject
{
	constructor(playground,x,y,radius,color,speed,is_me){//is_me 判断是否为自己
	 super();
	this.playground=playground;
	this.ctx=this.playground.game_map.ctx;
	this.x=x;
	this.y=y;
	this.vx=0;
	this.vy=0;
	this.radius=radius;
	this.color=color;
	this.speed=speed;
	this.is_me=is_me;
	this.eps=0.1;
	
	}
	start(){
		if(this.is_me)
		{
			this.add_listening_events();
		}
	}
	add_listening_events(){
		//鼠标监听
		let outer=this;
		this.playground.game_map.$canvas.on("contextmenu",function(){
			return false;//取消右键点击
		});
		this.playground.game_map.$canvas.mousedown(function(e){
			if(e.which===3){
				outer.move_to(e.clientX,e.clientY);	
			}
		});
	

	}
	move_to(tx,ty)
	{
		console.log("move to",tx,ty);
	}
	update()
	{
		this.x+=this.vx;
		this.y+=this.vy;
		this.render();

	}
	render()
	{
		this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		this.ctx.fillStyle =this.color;
		this.ctx.fill();
	}
}
