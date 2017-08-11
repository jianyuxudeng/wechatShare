var request = require('request');
var sha1 = require('sha1');

function getSignPackage(url,appId,appSecret,callback){
	request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret, function(error, res, body) {
		if(!error && res.statusCode == 200) {
			body = JSON.parse(body);
			var access_token = body.access_token;
			getAccessToken(access_token);
		}
	})

	function getAccessToken(access_token) {
		request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=' + access_token, function(error, res, body) {
			if(!error && res.statusCode == 200) {
				body = JSON.parse(body);
				var ticket = body.ticket;
				getJsApiTicket(ticket, access_token);
			}
		})
	}

	function getJsApiTicket(ticket, access_token) {
		var timestamp = parseInt((new Date()).getTime() / 1000);
		var noncestr = setNoncestr();
		var str = "jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url="+url;
		var signature = sha1(str);
		var data = {
			timestamp:timestamp,
			nonceStr:noncestr,
			appId:appId,
			signature:signature,
			url:url,
			ticket:ticket
		};
		callback(JSON.stringify(data));
	}
}

function setNoncestr() {
	var str = 'abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	var noncestr = "";
	for(var i = 0; i < 16; i++) {
		noncestr = noncestr + str.charAt(Math.floor(Math.random() * str.length));
	}
	return noncestr;
}

exports.getSignPackage = getSignPackage;