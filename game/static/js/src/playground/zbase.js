class AcGamePlayground{
	constructor(root)
	{
		this.root=root;
		this.$playground=$(`<div class="ac-game-playground"></div>`);
		this.hide();
		this.root.$ac_game.append(this.$playground);	
		this.start();

	}
	get_random_color()
	{
		let colors=["blue","red","pink","grey","green"];
		return colors[Math.floor(Math.random()*5)];
	}
	start()
	{
		let outer=this;
		$(window).resize(function()//当用户调整窗口大小时触发
		{	

			outer.resize();

			});
	}
	resize()//统一长度
	{
		console.log("resize");
		this.width=this.$playground.width();
		this.height=this.$playground.height();
		let unit=Math.min(this.width/16,this.height/9);//长宽比,看是高度还是长度
		this.width=unit*16;
		this.height=unit*9;
		this.scale=this.height;//调整窗口大小可以变化，相对位置不发生变化
		if(this.game_map)this.game_map.resize();//地图动态
	}
	show()
	{
		this.$playground.show();
		this.resize();
		this.width=this.$playground.width();
		this.height=this.$playground.height();
		this.game_map =new GameMap(this);
		this.players=[];
		this.players.push(new Player(this,this.width/2/this.scale,0.5,0.05,"white",0.15,true));
		for(let i=0;i<5;i++)
		{	
			this.players.push(new Player(this,this.width/2/this.scale,0.5, 0.05,this.get_random_color(), 0.15,false));	
		}
	}
	hide()
	{
		this.$playground.hide();
	}

}
