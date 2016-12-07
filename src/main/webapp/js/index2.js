var app=angular.module("myApp",["smartTable.table"]);
app.controller("testctrl", function($scope,$http){
	// 分页配置
	$scope.itemsByPage = 10; // 每页条数
	$scope.maxSize = 8; // 显示的页数
	$scope.currentPage = 1; // 当前页
	$scope.dataNumber = 1; // 数据总条数
	$scope.numberOfPages = Math.ceil($scope.dataNumber/$scope.itemsByPage); // 总页数
	// 监听是否翻页
	$scope.$watch('currentPage + itemsByPage', function (){
		$scope.search();
	});
	$scope.searchForm={};
	$scope.search=function(){
		$scope.searchForm.offset = $scope.currentPage;
		$scope.searchForm.size = $scope.itemsByPage;
		console.log($scope.searchForm);
		$http({
			method:'GET',
			url:"http://"+window.location.host+"/ueditor", 
			params:$scope.searchForm,
			})
			.success(function(data){
				console.log(data.data);
				$scope.attributes=JSON.parse(data.data.rows);
				$scope.dataNumber = data.data.total;
				$scope.numberOfPages = Math.ceil($scope.dataNumber/$scope.itemsByPage);
			})
		    .error(function(){
		    	alert("查询失败");
		    });
	}
	$scope.haveAColorSeeSee=function(obj){
		window.open("http://"+window.location.host+"/myueditor/index3.html?id="+obj.id);
	}
});