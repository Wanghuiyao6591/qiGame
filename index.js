$(function(){
	var kongbai={};
	for(var i=0;i<15;i++){
		$('<b>')
		.addClass('heng')
		.appendTo('.qipan');
		$('<i>')
		.addClass('shu')
		.appendTo('.qipan');
		for(var j=0;j<15;j++){
			kongbai[i+'-'+j]={x:i,y:j};
			$('<div>')
			.attr('id',i+'-'+j)
			.data('pos',{x:i,y:j})
			.addClass('qizi')
			.appendTo('.qipan');
		}
	}
	for(var i=0;i<5;i++){
		$('<span>')
		.appendTo('.qipan');
	}

	var kaiguan=true;
	var hei={};
	var bai={};
	var isAi=true;

	var join=function(n1,n2){
		return n1+'-'+n2;
	}

	function panduan(pos,biao){
		//得到对应的棋子的表
		var h=1,s=1,zx=1,yx=1;
		var tx,ty;
		tx=pos.x;ty=pos.y;
	 	while(biao[join(tx,ty-1)]){
				h++;
				ty--;
		}
		tx=pos.x;ty=pos.y;
		while(biao[join(tx,ty+1)]){
				h++;
				ty++;
		}
		
		tx=pos.x;ty=pos.y;
	 	while(biao[join(tx-1,ty)]){
				s++;
				tx--;
		}
		tx=pos.x;ty=pos.y;
		while(biao[join(tx+1,ty)]){
				s++;
				tx++;
		}
		

		tx=pos.x;ty=pos.y;
	 	while(biao[join(tx+1,ty-1)]){
				zx++;
				ty--;
				tx++
		}
		tx=pos.x;ty=pos.y;
		while(biao[join(tx-1,ty+1)]){
				zx++;
				ty++;
				tx--;
		}

		tx=pos.x;ty=pos.y;
	 	while(biao[join(tx-1,ty-1)]){
				yx++;
				ty--;
				tx--;
		}
		tx=pos.x;ty=pos.y;
		while(biao[join(tx,ty+1)]){
				yx++;
				ty++;
				tx++;
		}
		return Math.max(h,s,zx,yx);
	}

	var ai=function(){
		var max1=-Infinity;
		var zuobiao1;
		for(var i in kongbai){
			var weixie=panduan(kongbai[i],hei);
			if(weixie>max1){
				max1=weixie;
				zuobiao1=kongbai[i];
			}
		}
		var max2=-Infinity;
		var zuobiao2;
		for(var i in kongbai){
			var weixie=panduan(kongbai[i],bai);
			if(weixie>max2){
				max2=weixie;
				zuobiao2=kongbai[i];
			}
		}
		return (max1>max2)?zuobiao1:zuobiao2;
	}
	$('.qizi').on('click',function(){
		//不能二次点击换颜色
		if($(this).hasClass('hei') || $(this).hasClass('bai')){
			return;
		}
		//下子，记录
		var pos=$(this).data('pos');
		if(kaiguan){
			$(this)
			.css({opacity:1})
			.addClass('hei');	
			hei[pos.x+'-'+pos.y]=true;
			delete kongbai[join(pos.x,pos.y)];
			if(panduan(pos,hei) >=5){
				$('.qizi').off('click');
				alert('黑棋赢了！');
			}
			// kaiguan=false;
			if(isAi){
				var pos=ai();
				$('#'+join(pos.x,pos.y)).addClass('bai').css({opacity:1});
				bai[join(pos.x,pos.y)]=true;
				delete kongbai[join(pos.x,pos.y)];
				if(panduan(pos,bai) >=5){
					$('.qizi').off('click');
					alert('白棋赢了！');
				}	
				return;
			}	
		}else{
			$(this)
			.css({opacity:1})
			.addClass('bai');
			bai[pos.x+'-'+pos.y]=true;	
			if(panduan(pos,bai) >=5){
				$('.qizi').off('click');
				alert('白棋赢了！');
			}
			// kaiguan=true;
		}
		kaiguan=!kaiguan;
	})
})