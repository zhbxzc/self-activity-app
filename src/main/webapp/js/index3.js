var htmlId = getUrlParam('id');
var app=angular.module("myApp",["smartTable.table"]);
app.controller("testctrl", function($scope,$http){
	$scope.search=function(){
		$http({
			method:'GET',
			url:"http://10.136.25.67:8018/ueditor/"+htmlId, 
			params:{}
			})
			.success(function(data){
				console.log(data.data);
				$("#content").html(JSON.parse(data.data).content);
				$(document).attr("title",JSON.parse(data.data).name);
			})
		    .error(function(){
		    	alert("查询失败");
		    });
	}
	$scope.search();
});
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; //返回参数值
}