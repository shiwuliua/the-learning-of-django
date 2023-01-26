class Particle extends AcGameObject
{
	constructor(playground,x,y,radius,vx,vy,color,speed,move_length)
	{
		super();
		this.playground=playground;
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.vx=vx;
		this.vy=vy;
		this.color=color;
		this.speed=speed;
		this.friction=0.95;
		this.move_length=move_length;
		this.ctx=this.playground.game_map.ctx;
		this.eps=0.01;
	}	
	start()
	{

	}
	update()
	{

		if(this.speed<this.eps||this.move_length<this.eps)
		{
			this.destroy();
			return false;
		
		}
		let moved=Math.min(this.move_length,this.speed * this.timedelta/1000);
		this.x+=this.vx*moved;
		this.y+=this.vy*moved;
		this.speed *=this.friction;
		this.move_length-=moved;
		this.render();
	}
	render()
	{
		this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		this.ctx.fillStyle=this.color;
		this.ctx.fill();
	}

}
