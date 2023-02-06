class GameMap extends AcGameObject
{
	constructor(playground)
	{
		super();//调用基类
		this.playground=playground;
		this.$canvas=$(`<canvas tabindex=0></canvas>`);//画布
		this.ctx=this.$canvas[0].getContext('2d');
		this.ctx.canvas.width=this.playground.width;
		this.ctx.canvas.height=this.playground.height;
		this.playground.$playground.append(this.$canvas);
	}
	start(){

	}
	resize()//修改黑框长宽比
	{
		this.ctx.canvas.height=this.playground.height;
		this.ctx.canvas.width=this.playground.width;
		this.ctx.fillStyle="rgba(0,0,0,1)";
		this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

	}
	update()
	{
	this.y+=this.vy;
	this.x+=this.vx;
	this.render();
	}
	render(){//渲染
	this.ctx.fillStyle="rgba(0,0,0,0.2)";	
	this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		
	}

}
