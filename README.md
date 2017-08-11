这个插件封装了使用nodejs 获取微信分享签名的接口

<p>
调用接口，只需要用ajax获取接口
var getSignPackage = require("./server.js").getSignPackage;
实例化接口调用
</p>
<p>
app.get("/get_signature", function(req, res) {
	var url = (req.url).split("url=")[1];
	var appId = "微信公众号appId";
    var appSecret = "微信公众号appSecret"; 
	getSignPackage(url,appId,appSecret,function(data){
		res.jsonp(JSON.parse(data))
	})
})
实例化接口
</p>