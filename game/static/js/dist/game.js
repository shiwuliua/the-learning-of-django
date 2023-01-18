class AcGameMenu{
 constructor(root)//窗口对象
{
	this.root=root;
	this.$menu=$(`
<div class="ac-game-menu">
</div>
`);
	this.root.$ac_game.append(this.$menu);
}


}
class AcGame{
 constructor(id){
  this.id=id;
	this.$ac_game=$('#'+id);
	 this.menu =new AcGameMenu(this);



 }

}
