class AcGamePlayground{
	constructor(root)
	{
		this.root=root;
		this.$playground=$(`<div class="ac-game-playground">
		<div>前端展示真的跟个美工一样</div>
		</div>
			`);
		this.hide();
		this.root.$ac_game.append(this.$playground);
		this.start();
	
	}
	start()
	{

	}
	show()
	{
		this.$playground.show();
	}
	hide()
	{
		this.$playground.hide();
	}

}
