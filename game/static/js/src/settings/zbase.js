class Settings
{
	constructor(root)
	{
		this.root=root;
		this.platform="WEB";
		if(this.root.AcWingOS)this.platform="ACAPP";
		this.username="";
		this.photo="";
		this.$settings = $(`<div class="ac-game-settings"></div>`);
		this.root.$ac_game.append(this.$settings);
		this.start();
	}
	start()
	{
		this.getinfo();
	}
	register()
	{

	}
	login(){

	}

	getinfo()
	{
		let outer=this;
		$.ajax({

			url:"https://app4576.acapp.acwing.com.cn/settings/getinfo/",
		type:"GET",
		data:{
			platform:outer.platform,

			},
		success:function(resp){//调用成功
		console.log(resp);
			if(resp.result ==="success")
			{
				outer.username=resp.username;
				outer.photo=resp.photo;
				

				//登陆成功
				//隐藏菜单
				outer.hide();
				outer.root.menu.show();
			}else//失败
			{
				console.log("test");
				//outer.root.settings.show();
			//	outer.show();
				outer.login();//d登陆界面
			}
		}
	

		});
	}
	hide()
	{
		this.$settings.hide();
		
	}
	show()
	{
		this.$settings.show();
	}
}
