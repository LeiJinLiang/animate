(function($){
  var _APP_WX_SIGNATURE = "http://wx.cloudcross.net/js/getJsSign";	
  var appid = '',
      appsecret = '',
      nonceStr = '',
      timestamp = '',
      signature = '',
      url = location.origin + location.pathname + location.search,
      //labe="#swL0"+$("#mms").text(),
      //relink=$("#mms").text(),

  
      share = {
        title:    "", // 分享标题
        desc:     $("meta[data-share='desc-default']").attr("content"),  // 分享描述
        imgUrl:   "http://project.cloudcross.net/bvlgari/images/share_label.jpg",   // 分享图标
        link:     "http://project.cloudcross.net/bvlgari/share.html",                                             // 分享链接
        type:     '',                                                      // 分享类型,music、video或link，不填默认为link
        dataUrl:  '',                                                      // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        },
        trigger: function(res){
//          var inviteesId = $("#inviteesId").val();
//          var style = $("#style_").val();
//          if (inviteesId != "-1") {
//            share.title  =   "尊敬的"+$("#inviteesName_").val()+" "+$("#inviteesTitle_").val()+"，快来参加我们的婚礼吧！"; // 分享标题
//            share.desc   =   "尊敬的"+$("#inviteesName_").val()+" "+$("#inviteesTitle_").val()+"，快来参加我们的婚礼吧！";  // 分享描述
//            share.imgUrl =   $("meta[data-share='img-"+style+"']").attr("content");   // 分享图标
//            share.link   =   location.origin + "/card.html?inviteesId="+inviteesId; // 分享链接
//          } 
         var labe="#swL00";
         var relink=$("#mms").text();
             if(shareMsg){
             	share.title="宝格丽邀您探索伊丽莎白·泰勒的传奇人生。";
             }else{
             	labe="#swL0"+$("#mms").text();
           		share.title=$(labe).text();            	
             }
             if(relink){
             	share.link="http://project.cloudcross.net/bvlgari/share.html?mms="+relink;
             }else{
             	share.link="http://project.cloudcross.net/bvlgari/share.html?mms=0";
             }
           
        }
        
      };
  //取签名
  
  $.ajax({
    url: _APP_WX_SIGNATURE,
    type: "post",
    data: {"url":url},
    dataType: "json",
    success: function(data) {
      signature = data.signature;
      jsapi_ticket = data.jsapi_ticket;
      nonceStr = data.nonceStr;
      timestamp = data.timestamp;
      url = data.url;
      
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx5c1344f317e71789', // 必填，公众号的唯一标识
        timestamp: timestamp , // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline',
                    'onMenuShareAppMessage'
                    ]
      });
    }
  });
  
 
  wx.ready(function(){
    wx.onMenuShareTimeline(share);
    wx.onMenuShareAppMessage(share);
  });
  
})(jQuery);
