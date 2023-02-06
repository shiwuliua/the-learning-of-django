class Settings
{
	constructor(root)
	{
		this.root=root;
		this.platform="WEB";
		if(this.root.AcWingOS)this.platform="ACAPP";
		this.username="";
		this.photo="";
		this.$settings = $(`
<div class="ac-game-settings">
	<div class ="ac-game-settings-login">
	    <div class="ac-game-settings-title">
	    	登陆
	    </div>
	    <div class="ac-game-settings-username">
	    	<div class="ac-game-settings-item">
		  <input type="text" placeholder="用户名">
		</div>
	    </div>
	    <div class="ac-game-settings-password">
	    	<div class="ac-game-settings-item">
		    <input type="password" placeholder="密码">
		</div>
	    </div>
	    <div class="ac-game-settings-submit">
	    	<div class="ac-game-settings-item">
		   <button>登录</button>
		</div>
	    </div>
	    <div class="ac-game-settings-error-message">
	    </div>
	    <div class="ac-game-settings-option">
	    	注册
	    </div>
	    <br>
	    <div class="ac-game-settings-acwing">
	    	<img width="30"  src="https://app4576.acapp.acwing.com.cn/static/image/settings/acwing.png">
		<br>
		<div>
			Acwing一键登陆
		</div>
	    </div>
	</div>
	<div class="ac-game-settings-register">
		<div class="ac-game-settings-title">
	    	注册
	    </div>
	    <div class="ac-game-settings-username">
	    	<div class="ac-game-settings-item">
		  <input type="text" placeholder="用户名">
		</div>
	    </div>
	    <div class="ac-game-settings-password ac-game-settings-password-first">
	    	<div class="ac-game-settings-item">
		    <input type="password" placeholder="密码">
		</div>
	    </div>
	    <div class="ac-game-settings-password ac-game-settings-password-second">
	    	<div class="ac-game-settings-item">
		    <input type="password" placeholder="确认密码">
		</div>
	    </div>

	    <div class="ac-game-settings-submit">
	    	<div class="ac-game-settings-item">
		   <button>注册</button>
		</div>
	    </div>
	    <div class="ac-game-settings-error-message">
	    </div>
	    <div class="ac-game-settings-option">
	    	登陆
	    </div>
	    <br>
	    <div class="ac-game-settings-acwing">
	    	<img width="30"  src="https://app4576.acapp.acwing.com.cn/static/image/settings/acwing.png">
		<br>
		<div>
			Acwing一键登陆
		</div>
	    </div>
	</div>
			
	</div>



</div>`);

		this.$login=this.$settings.find(".ac-game-settings-login");
		this.$login_username=this.$login.find(".ac-game-settings-username input");//找到username里的input();
		this.$login_password=this.$login.find(".ac-game-settings-password input");
		this.$login_submit=this.$login.find(".ac-game-settings-submit button");
		this.$login_register=this.$login.find(".ac-game-settings-option");
		this.$login_error_message=this.$login.find(".ac-game-settings-error-message");
		this.$login.hide();
		this.$register=this.$settings.find(".ac-game-settings-register");
		//this.$register.hide();//注册逻辑
		this.$register_username=this.$register.find(".ac-game-settings-username input");
		this.$register_password=this.$register.find(".ac-game-settings-password-first input");
		this.$register_password_confirm=this.$register.find(".ac-game-settings-password-second input");
		this.$register_submit=this.$register.find(".ac-game-settings-submit button");
		this.$register_error_message=this.$register.find(".ac-game-settings-error-message");
		this.$register_login=this.$register.find(".ac-game-settings-option");
		this.$register.hide();
		this.root.$ac_game.append(this.$settings);
		this.$acwing_login=this.$settings.find(".ac-game-settings-acwing img");
		this.start();
	}
	start()
	{
		this.getinfo();
		this.add_listening_events();
	}
	add_listening_events(){
		let outer=this;
		this.add_listening_events_login();
		this.add_listening_events_register();
		this.$acwing_login.click(function(){
			//outer.acwing_login();
			$.ajax({
			url:"https://app4576.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
			type:"GET",
			success:function(resp){
			console.log(resp)
				if(resp.result==="success")
				{
					window.location.replace(resp.apply_code_url);//重定向
				}
			}




			})
		});

	}
	acwing_login()
	{
		console.log("tests");
	}
	add_listening_events_login(){
		let outer=this;
		this.$login_register.click(function(){
			outer.register();//
		});
	}
	add_listening_events_register()
	{
		let outer=this;
		this.$register_login.click(function(){
			outer.login();
		});
		this.$login_submit.click(function(){
			outer.login_on_remote();
		});
		this.$register_submit.click(function(){
			outer.register_on_remote();
		});
	}
	login_on_remote()//在远程服务器上登陆
	{
		let outer=this;
		let username=this.$login_username.val();//取出值
		let password=this.$login_password.val();
		console.log(username);
		console.log(password);
		this.$login_error_message.empty();//清空登陆错误信息
		$.ajax({
			url:"https://app4576.acapp.acwing.com.cn/settings/login/",
			type:"GET",
			data:
			{
				username:username,
				password:password,
			},
			success:function(resp)
			{
				console.log(resp);
				
				if(resp.result==="success")
				{
					location.reload();//刷新，如果登陆成功后刷新后就直接登陆
				}else
				{
					console.log("test2")
					outer.$login_error_message.html(resp.result);
				}
			}
		

		});

	}
	register_on_remote(){//在远程服务器上注册
		let outer=this;
		let username=this.$register_username.val();
		let password=this.$register_password.val();
		let password_confirm=this.$register_password_confirm.val();
		this.$register_error_message.empty();
		$.ajax({
		url:"https://app4576.acapp.acwing.com.cn/settings/register/",
		type:"GET",
		data:{

		username:username,
		password:password,
		password_confirm:password_confirm,
		},
		success:function(resp)
		{
			console.log(resp);
			//ag console.log 全文搜索
			if(resp.result==="success")
			{
				location.reload();//刷新页面 注册成功直接登陆
			}else
			{
				outer.$register_error_message.html(resp.result);
			}
		}




		});

	}
	logout_on_remote(){
		if(this.platform==="ACAPP")return false;
		$.ajax({
		url:"https://app4576.acapp.acwing.com.cn/settings/logout/",
		type:"GET",
		success:function(resp)
		{
		
			console.log(resp);
			if(resp.result ==="success")
			{
				location.reload();
			}
		}

		})

	}//在远程服务器上登出
	register()
	{
		this.$login.hide();
		this.$register.show();
	}
	login(){
		this.$register.hide();
		this.$login.show();
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
				//outer.register();
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
