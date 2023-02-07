let AC_GAME_OBJECTS=[];
class AcGameObject
{
	constructor()
	{
		AC_GAME_OBJECTS.push(this);
		this.has_called_start =false;//是否调用start函数
		this.timedelta = 0;//当前距离上一帧的时间间隔 i
		this.uuid=this.create_id();
	}
	create_id(){//多人模式下的唯一id

		let res="";
		for(let i=0;i<8;i++){
			let x=parseInt(Math.floor(Math.random()*10));//返回【0,1)之间的数字			
			res+=x;

		}
		return res;
	}
	start(){//只会在一帧执行一次

	}
	update(){//每一帧会执行一次

	}
	on_destory(){//删除该物
	}
	destroy(){//删掉该物体
		this.on_destory();
		for(let i=0;i<AC_GAME_OBJECTS.length;i++)
		{
			if(AC_GAME_OBJECTS[i]===this)
			{
				AC_GAME_OBJECTS.splice(i,1);
				break;
			}
		}
	}

}
let last_timestamp;
let AC_GAME_ANIMATION=function(timestamp)
{

	for(let i=0;i<AC_GAME_OBJECTS.length;i++)
	{
		let obj=AC_GAME_OBJECTS[i];
		if(!obj.has_called_start)
		{
			obj.start();
			obj.has_called_start=true;
		}else
		{
			obj.timedelta=timestamp-last_timestamp;
			obj.update();
		}
	}
	last_timestamp=timestamp;
	requestAnimationFrame(AC_GAME_ANIMATION);
}
requestAnimationFrame(AC_GAME_ANIMATION);
