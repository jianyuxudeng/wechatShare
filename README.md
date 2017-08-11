这个插件封装了使用nodejs 获取微信分享签名的接口

<p>
调用接口，只需要用ajax获取接口
var getSignPackage = require("./server.js").getSignPackage;
实例化接口调用
</p>
<p>
app.get("/get_signature", function(req, res) {
	var url = (req.url).split("url=")[1];
	var appId = "wxbf52b89ac6da63b0";
    var appSecret = "c3b6d4d5e911cf7bdaa43a914fe6ea0b"; 
	getSignPackage(url,appId,appSecret,function(data){
		res.jsonp(JSON.parse(data))
	})
})
实例化接口
</p>