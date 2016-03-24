// JavaScript Document
var w;
var h;
var shareMsg=true;
var isMove=false;
var breakingShow=true;
var lottery;
var showStepArray=[];
var nowStep=0;
var showClass=false;
var loadingMoves;
var time0=.2;
var time1=88;
var gg=39;
var isLoadComp=false;
var nowChoseNums=-1;
var shareURL;
var isFirst=true;
var ldComp=false;
document.addEventListener("touchmove",function(event){
	event.preventDefault();
},false);

$(document).ready(function(e) {
    w=$(window).width();
    h=$(window).height();
    init();

});

function hengshuping(){  
    if(window.orientation==180||window.orientation==0){ 
        $(".pop").css({"display":"none"});
    }  
    if(window.orientation==90||window.orientation==-90){  
       
        $(".pop").fadeIn();		
    }  
} 
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

function init(){
	$(".step").each(function(index, element) {
		TweenLite.set($(this),{x:w});
        showStepArray.push($(this));
    });
	
	$(".loading span").each(function(i) {
		if(i==($(".loading span").length-1)){
			TweenLite.to($(this),4,{opacity:1,delay:time0*i,onComplete:loadingMove});
		}else{
			TweenLite.to($(this),4,{opacity:1,delay:time0*i});
		}
    });
	TweenLite.set(showStepArray[nowStep],{x:0});
	
	setsize(".stepCard",w,h);
	setsize(".conents",w,h);
	setsize(".step",w,h);
	

	//loading
	var imgArrays=[];
	$("img").each(function(i) {
        imgArrays.push($(this).attr("loadsrc"));
    });
	
	var loader = new $.ImgLoader({
	  srcs: imgArrays,
	  pipesize: 2, // max connections (optional)
	  delay: 100, // interval between each img loads (optional)
	  useXHR2: false, // use xhr2 if the browser supports it (optional) (default: false)
	  timeout: 20000 // xhr2 timeout (optional) (default: 10000)
	});
	loader.on('progress', function(progressInfo){
	  //console.log(progressInfo.loadedRatio); 
	});
	loader.on('itemload', function($img){
	  //$('#somewhere').append($img);
	});
	loader.on('allload', function($img){
	  	$("img").each(function(i) {
			var ss=$(this).attr("loadsrc");
			$(this)[0].src=ss;
		});
		isLoadComp=true;
	});
	loader.load();
	
}

//----显示结果
function showJg(){
	nowStep=2;
	$("#mms").text(nowChoseNums);
	
    var t='<div class="textIntro'+nowChoseNums+' text_area"><img src="images/showt'+nowChoseNums+'.png" /></div>';
	$(".flootBox").prepend(t);
	
	TweenLite.set($(".step2"),{y:h,x:0,onComplete:function(){
		TweenLite.to($(".step2"),.5,{y:0});
		shareMsg=false;
	}});	
	 
	
	 if(breakingShow){
					 setTimeout(function(){
							TweenMax.set($(".alertShare"),{scale:0,onComplete:function(){			
								TweenMax.to($(".alertShare"),.5,{scale:1,alpha:1,onComplete:function(){
									$(".step2").one("tap",function(){
										TweenMax.to($(".alertShare"),.5,{scale:0,alpha:0});					
									});
								}});		
							}});		 
						},2000);
					breakingShow=false;
	 }
	 
	var startY = 0;
    var endY = 0;
    var touchstartEvent = function(e){
      //e.preventDefault();
      var touch = e.targetTouches[0];
      startY = endY = touch.pageY;
    };
    var touchmoveEvent = function(e){
      //e.preventDefault();
      var touch = e.targetTouches[0];
      endY = touch.pageY;
    };
    var touchendEvent = function(e){
      if (startY - endY > 50) {
        e.preventDefault();
        e.stopPropagation();  
        
      } else if(endY - startY > 50) {
        e.preventDefault();
        e.stopPropagation();
        $(".step2").css("transform","matrix(1,0,0,0,"+w+",0)");
        shareMsg=true;
        //$(".step2").css("transform","matrix(1,0,0,0,320,0)");
        $(".text_area").remove();
      }
    };
  $(".step2")[0].addEventListener('touchstart', touchstartEvent);
  $(".step2")[0].addEventListener('touchmove',  touchmoveEvent);
  $(".step2")[0].addEventListener('touchend', touchendEvent);
}


//----滑动卡牌
function swapCard(){
	nowStep=1;
	TweenLite.set(showStepArray[1],{x:0});
	//var isOpen=false;
	var len=$(".stepCard").length;	
	var lightItem;	
	idToShowCard(0,false);
	TweenLite.set($(".stepCard"),{x:w});
	
  
    TweenMax.to($(".leftChange"),2,{opacity:0,x:-50,repeat:-1});
	$(".leftChange").bind("tap",function(){
		var tg=nowChoseNums-1;
		if(tg>=0){
			idToShowCard(tg,true);
		}
		
		
	});

    TweenMax.to($(".rightChange"),2,{opacity:0,x:50,repeat:-1});
	$(".rightChange").bind("tap",function(){
		var tg=nowChoseNums+1;
		if(tg>=len){
			if(isFirst){
				isFirst=false;
				$(".moveIcon").css({"display":"block"});
				lightItem=TweenMax.to($(".moveIcon"),1,{opacity:.5,yoyo:true,repeat:-1});
			}
			tg=0;
		  
		  
		}
   
		idToShowCard(tg,false);
});
//	$(".quickTips").delay(50000).addClass("hidden");
	
	$(".moveIcon").bind("tap",function(){
        showJg();
   //     lightItem.kill();
        
		/*if(isOpen){
			TweenMax.to($(".alertTipBox"),.5,{scale:0,alpha:0});
			showJg();
			lightItem.kill();
		}else{
			isOpen=true;
			TweenMax.set($(".alertTipBox"),{scale:0,onComplete:function(){
				TweenMax.to($(".alertTipBox"),.5,{scale:1,alpha:1});
			}});
			$(".step1").one("tap",function(e){
				TweenMax.to($(".alertTipBox"),.5,{scale:0,alpha:0});
			});
		}*/
		
	});
	
	
	function idToShowCard(ids,leftOrRight){
		if(isMove){
			return;
		}
		if(ids==nowChoseNums){
			return;
		}
		isMove=true;
		if(ids==0){
			$(".leftChange").css({"display":"none"});
			
		}else{
			$(".leftChange").css({"display":"block"});
		}
		if(ids==2){	

			$(".rightChange").css({"display":"block"});
		}else{
			$(".rightChange").css({"display":"block"});
		}
		

		if(leftOrRight){
			TweenLite.set($(".stepCard").eq(ids),{x:-w,onComplete:function(){
				TweenLite.to($(".stepCard").eq(ids),.5,{x:0,onComplete:function(){
					isMove=false;
					nowChoseNums=ids;
				}});
			}});
			if(nowChoseNums!=-1){
				TweenLite.to($(".stepCard").eq(nowChoseNums),.5,{x:w});
			}
		}else{
			TweenLite.set($(".stepCard").eq(ids),{x:w,onComplete:function(){
				TweenLite.to($(".stepCard").eq(ids),.5,{x:0,onComplete:function(){
					isMove=false;
					nowChoseNums=ids;
				}});
			}});
			if(nowChoseNums!=-1){
				TweenLite.to($(".stepCard").eq(nowChoseNums),.5,{x:-w});
			}
		}
	}
}

//


//--loading动画
function loadingMove(){
	TweenLite.to($(".loading"),.8,{opacity:0,delay:1,onComplete:function(){
		$(".loading").css({"display":"none"});
	}});
	drewsnow(function(){
        //console.log(1);
		//---loadingcomp
		TweenLite.to($(".tips"),.5,{alpha:0.9,onComplete:function(){
			$("body").one("vmousemove",function(){
				TweenLite.to($(".tips"),.5,{autoAlpha:0});
				
			});
		}});
		swapCard();
		lottery = new Lottery('drawSnow', '#CCC', 'color', w, h, drawPercent);
		 lottery.init('', 'cav');
			
		 function drawPercent(percent) {
			if(percent>=gg){
				isMove=true;
				lottery.dispose();
				TweenLite.to(showStepArray[0],.5,{opacity:0,onComplete:function(){
					isMove=false;
					TweenLite.set(showStepArray[0],{x:w});
					$(".step1").unbind();
					$(".quickTips").delay(2000).fadeOut(500,function(){
						var len=$(".stepCard").length;	
						$(".step1").bind("vmousedown",function(e){		
							var oldx=e.pageX;
							$(".quickTips").addClass("hidden");
							$("body").one("vmouseup",function(e){
								var tg;
								if((e.pageX-oldx)>50){
									tg=nowChoseNums-1;
									if(tg>=0){
										idToShowCard(tg,true);
									}
								}else if((e.pageX-oldx)<-50){
									tg=nowChoseNums+1;
									if(tg>=len){
										if(isFirst){
											isFirst=false;
											$(".moveIcon").css({"display":"block"});
											$(".rightChange").css({"display":"none"});
											showClass=true;
											lightItem=TweenMax.to($(".moveIcon"),1,{opacity:.5,yoyo:true,repeat:-1});
					                        TweenMax.set($(".alertTipBox"),{scale:0,alpha:0,onComplete:function(){
					                            TweenMax.to($(".alertTipBox"),.5,{scale:1,alpha:1});
					                        }});
									
					                        $("body").one("tap",function(){
					                            TweenMax.to($(".alertTipBox"),.5,{scale:0,alpha:0});
					                        });
										}
										tg=0;
									}else{
										idToShowCard(tg,false);
									}
								}
								
							});		
						});
						
						function idToShowCard(ids,leftOrRight){
							if(isMove){
								return;
							}
							if(ids==nowChoseNums){
								return;
							}
							isMove=true;
							if(ids==0){
								$(".leftChange").css({"display":"none"});
								
							}else{
								$(".leftChange").css({"display":"block"});
							}
							if(ids==2&&showClass){
								$(".rightChange").css({"display":"none"});
							}else{
								$(".rightChange").css({"display":"block"});
							}
							
						//	$("#mms").text(ids);  
							
							if(leftOrRight){
								TweenLite.set($(".stepCard").eq(ids),{x:-w,onComplete:function(){
									TweenLite.to($(".stepCard").eq(ids),.5,{x:0,onComplete:function(){
										isMove=false;
										nowChoseNums=ids;
									}});
								}});
								if(nowChoseNums!=-1){
									TweenLite.to($(".stepCard").eq(nowChoseNums),.5,{x:w});
								}
							}else{
								TweenLite.set($(".stepCard").eq(ids),{x:w,onComplete:function(){
									TweenLite.to($(".stepCard").eq(ids),.5,{x:0,onComplete:function(){
										isMove=false;
										nowChoseNums=ids;
									}});
								}});
								if(nowChoseNums!=-1){
									TweenLite.to($(".stepCard").eq(nowChoseNums),.5,{x:-w});
								}
							}
						}
					});//手
					
				}});				
			}			
		}
			
	});
}


function setsize(items,ww,hh){
	$(items).css({width:ww,height:hh});
}

function    drewsnow(compFun){
    var canvas = document.getElementById("drawSnow");
    var ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    var mp = 1000; 
    var particles = [];
	var angle = 0;
	var tgtime={t:0}
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*w, //x-coordinate
            y: Math.random()*-h-3, //y-coordinate
            r: Math.random()*2 , //radius
            d: Math.random()*mp, //density
			ease:Math.random()*0.01,
			tgy:Math.random()*h-3
        })
    }

    function draw()
    {
        ctx.clearRect(0, 0, w, h);
		
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,w,h);
		
        ctx.fillStyle = "rgba(201, 158, 81, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
    }
	
	loadingMoves=TweenLite.to(tgtime,time1,{t:1000,onUpdate:update});
	
	
    function update()
    {
        angle += 0.01;
		if(isLoadComp){
            for (var i = 0; i < mp; i++) {
                var p = particles[i];
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle + p.d)* (p.r/2);
                if (p.x > w || p.x < 0 || p.y > h) {
                    particles[i] = {x: Math.random() * w, y: -10, r: p.r, d: p.d};
                }
            }
            draw();
            if(!ldComp){
                ldComp=true;
                setTimeout(function(){
                    console.log(1);
                    loadingMoves.kill();
                    compFun();
                    ctx.globalCompositeOperation = 'destination-out';
                    return;
                },5000);
            }
		}else{
			for (var i = 0; i < mp; i++) {
				var p = particles[i];
				p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle + p.d)* (p.r/2);
				if (p.x > w || p.x < 0 || p.y > h) {
					particles[i] = {x: Math.random() * w, y: -10, r: p.r, d: p.d};
				}
			}
			draw();
		}	
    }
   
}
//音频播放
$(function(){
  $audio = $("audio");
  $("#playbtn").click(function(){
    if ($audio[0].paused) {
      $audio[0].play();
      $(this).children().attr("src","images/music_on.png");
      } else {
      $audio[0].pause();
      $(this).children().attr("src","images/music_off.png");
     }
  });

})

