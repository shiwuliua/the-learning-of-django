export class AcGame{
 constructor(id,AcWingOS){
  this.id=id;
	this.$ac_game=$('#'+id);
	 this.AcWingOS=AcWingOS;//如果是在acwing 云端打开的网站，传递接口//判断哪个平台执行
	this.settings=new Settings(this);
	 this.menu=new AcGameMenu(this);
	this.playground=new AcGamePlayground(this);
	 this.start();


 }
	start(){}


}
