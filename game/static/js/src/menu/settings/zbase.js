class Settings
{
	constructor(root)
	{
		this.root=root;
		this.platform="WEB";
		if(this.AcWingOS)platform="ACAPP";
		
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
				//登陆成功
				//隐藏菜单
				outer.hide();
				outer.root.menu.show();
			}else//失败
			{
				outer.login();//d登陆界面
			}
		}
	

		});
	}
	hide()
	{

	}
	show()
	{

	}
}
