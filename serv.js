var getSignPackage = require("./server.js").getSignPackage;
var express = require('express');
var app = express();
var request = require('request');
var sha1 = require('sha1');
app.use('/', express.static('./'));

var http = require('http').createServer(app);

http.listen(8080, function() {
	console.log("80")
});




app.get("/get_signature", function(req, res) {
	var url = (req.url).split("url=")[1];
	var appId = "微信公众号appId";
    var appSecret = "微信公众号appSecret"; 
	getSignPackage(url,appId,appSecret,function(data){
		res.jsonp(JSON.parse(data))
	})
})

app.get('/index', function(req, res) {
	var dirName = __dirname;
	res.sendFile(dirName + "/index.html");
});