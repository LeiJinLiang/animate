var startY=0;
var endY=0;
var startX=0;
var endX=0;
var touchstartEvent = function(e){
      e.preventDefault();
      var touch = e.targetTouches[0];
      startY = endY = touch.pageY;
	  startX = endX = touch.pageX;
};
var touchmoveEvent = function(e){
  e.preventDefault();
  var touch = e.targetTouches[0];
  endY = touch.pageY;
  endX=touch.pageX;
};
var touchendEvent = function(e){
      if (startY - endY > 50) {
        e.preventDefault();
        e.stopPropagation();
        alert('up');  
        
      } else if(endY - startY > 50) {
        e.preventDefault();
        e.stopPropagation();
         alert('down');
      }
      if (startX - endX > 50) {
        e.preventDefault();
        e.stopPropagation();
        alert('left');  
        
      } else if(endX - startX > 50) {
        e.preventDefault();
        e.stopPropagation();
         alert('right');
      }
};
var ele=document.getElementsByTagName('main')[0];
ele.addEventListener('touchstart',touchstartEvent,false);
ele.addEventListener('touchmove',touchmoveEvent,false);
ele.addEventListener('touchend',touchendEvent,false);