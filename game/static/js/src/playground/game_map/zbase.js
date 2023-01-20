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
	update()
	{

	}


}
