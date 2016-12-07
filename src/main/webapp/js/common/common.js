console.info('加载','common.js');
/**
 * 通用请求接口
 * @param method   angular请求方式:'GET'/'get' ;'PUT'/'put' ;'POST'/'post';'DELETE'/'delete'
 * @param url      请求地址
 * @param headers  请求头的配置:如果使用默认方式,直接填写空对象 {}
 * @param param    请求参数   :如果没有参数,直接填写空对象    {}
 * @param callbacktype  回调函数
 */
function getDate(method,url,param,headers,callbacktype){
//	var token=$.cookie('token');
//	if(token==null||token==''||token==undefined){
//        此处是需要跳转的页面(后期增加)
//        return false;
//	}else{
//		 param.token=token;
		 $http{
		    	method:method,
		    	data:param,
		    	url:url,
		    	headers:headers,
		    	success:function (successData){//正常交互
		    		//响应成功,数据状态码为'success'
		    		if(resultData.status=='success'){
		    			callbacktype(successData.data);
					}
		    		//响应成功,数据状态码为'failure'
		    		if(successData.status=='failure'){
						alert("后台出错了");
					}
		    	},
		    	error:function(errorData){//交互错误
		    		console.log("error:" + JSON.stringify(data));
		            $scope.result_data = JSON.stringify(data);
		    	}
		 }
//	}
}