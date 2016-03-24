/**
 * @returns 返回Unix时间戳。
 */
function getTimestamp() {
	var timestamp = new Date().getTime();
	Net.getServerTime(function(data){
		if (data) {
			timestamp = data.serverTime;
		}
	});
	
	return timestamp;
}

$.fn.serializeObject = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
};  

/**
 * 解析URL参数。
 * 
 * @param url
 * @returns 解析后的键值对。
 */
function parseUrlParam(url) {
	if (typeof url == 'undefined' || 
			typeof url == undefined) { 
		return {};
	}

	var index = -1
	if ((index = url.indexOf('#')) < 0) {
		index = url.indexOf('?');
	}
	
	if (index < 0) {
		console.log('[debug]url<'+url+'>无效或者当中不包含参数。');
		return {};
	}

	var params = {};
	var entries = url.substring(index+1).split('&');
	console.log('[debug]url参数：' + entries);
	
	$.each(entries, function(index, item) {
		if (item.indexOf('=') >= 0) {
			var keyValue=item.split('=')
			params[keyValue[0]] = keyValue[1];
		}
	});
	
	return params;
}