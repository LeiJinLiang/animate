	$(document).ready(function(e) {
    		var params = parseUrlParam(window.location.href);
            var page=params.mms;
            
            //alert(page);
            
            
			var w=$(window).width();
			var h=$(window).height();
			var urls=window.location.href;
//			var ht;
//			if(urls.indexOf("#types")==-1){
//				ht=0;
//			}else{
//				ht=urls.split("#types")[1].substr(0,1);
//			}

			var t='<div class="textIntro'+page+'"><img src="images/showt'+page+'.png" /></div>';
			$(".flootBox").prepend(t);
			
            setsize(".conents",w,h);
			setsize(".step",w,h);
			
			function setsize(items,ww,hh){
				$(items).css({width:ww,height:hh});
			}
			
        });