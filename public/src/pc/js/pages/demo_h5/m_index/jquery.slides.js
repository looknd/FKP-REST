(function(f) {
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = f()
	} else if (typeof define === "function" && define.amd) {
		define( [], f)
	} else {
		f()
	}
}
(function(){ 	
	$(".pro_carousel").each(function(index,_this){
		_this=$(_this);
		var inner=_this.find(".pro_carousel_ul");
		var indicators=_this.find(".pro_carousel_page");
		var width,cycle,index;
			_this.DX=0,_this.MX=0,_this.UX=0,_this.DY=0,_this.MY=0,_this.UY=0,_this.TOP=0;
			_this.mark = true;
		var btnFlag = true;
		var innerFirst;
		var innerLast;
		//init() 初始化
		_this.init=function()
		{
			width=_this.width();
			_this.num=_this.find(".pro_carousel_ul li").width(width).length;
			firstLi = _this.find('.pro_carousel_ul li:first-child').html();
			lastli = _this.find('.pro_carousel_ul li:last-child').html();
			innerFirst = _this.find('.pro_carousel_ul').append("<li style='width: " + width + "px'>" + firstLi + "</li>");
			
			inner.width(width*_this.num+2+width).find(".pro_carousel_ul li").eq(0).clone().appendTo(innerFirst);
			for(i=0;i<_this.num-1;i++){
				html = $("<li><span></span></li>");
				indicators.find("ul").append(html);
			};
			index=0;
			
			_this.z=10;
			_this.w = width;
			_this.slide();
		}
		_this.on('touchstart',function(e){
			clearInterval(cycle);
			if(!_this.mark)return;
			
			var ev =event || e;
			if(ev.targetTouches){
				var touch = ev.targetTouches[0]; 
				_this.DY = touch.pageY;
				_this.DX = touch.pageX;
			}else{
				_this.DY = ev.clientY;
				_this.DX = ev.clientX;
			}
			
			_this.mark = false;
			return false;
		});
		
		_this.on('touchmove',function(e){
			if(_this.mark)return;
			var ev =event || e;
			if(ev.targetTouches){
				var touch = ev.targetTouches[0]; 
				_this.MY = touch.pageY;
				_this.MX = touch.pageX;
			}else{
				_this.MY = ev.clientY;
				_this.MX = ev.clientX;
			}
			
			_this.TOP=_this.DY-_this.MY
			var xl = Math.abs(_this.DX-_this.MX);
			if(xl>20&&xl>Math.abs(_this.TOP)){
				inner.css("left",-width*index-(_this.DX-_this.MX))
			}else{
				$("body").scrollTop($("body").scrollTop()+_this.TOP)
			}
			if(index==0){
				inner.css("left",0)
			}
			
			return false;
		});
		_this.on('touchend',function(e){
			//if(_this.mark)return;
/*				if(Math.abs(_this.MX - _this.DX) < 5 && Math.abs(_this.MY - _this.DY) < 5){
					_this.mark = true;
					if(inner.find(".pro_carousel_ul li a").length==_this.find(".pro_carousel_ul li").length)window.location.assign(inner.find(".pro_carousel_ul li a").eq(index).attr("url"));
					
					return false;
				}else if(_this.MX==0&&_this.MY==0){
					_this.mark = true;
					if(inner.find(".pro_carousel_ul li a").length==_this.find(".pro_carousel_ul li").length)window.location.assign(inner.find(".pro_carousel_ul li a").eq(index).attr("url"));
					
					return false;
				}*/
			if(_this.DX-_this.MX>20){
				btnFlag = true;
				lb();
			}
			if(_this.DX-_this.MX<-20){
				index = index--<_this.num-2?0:index;
				inner.animate({
					left:-width*index
				})
				indicators.find("li").eq(index).addClass("active").siblings().removeClass("active");	
			}
			_this.mark = true;
			_this.slide();
			return false;
		});
		_this.slide=function()
		{
			cycle=setInterval(function(){
				btnFlag = true;
				lb();				
			},3000)
		}
		function lb(){
			if(btnFlag){
				index = index++<(_this.num)?index:0;
			}/*else{
				index = index--<_this.num-2?(_this.num-1):index;
				console.log(index)
			}*/
			inner.animate({
					left:-width*index
				},500,function(){
					if(index==_this.num){
						inner.css("left","0");
						index = 0;
					}
					indicators.find("li").eq(index).addClass("active").siblings().removeClass("active");	
				})

		}
		_this.init();
	});
}));
