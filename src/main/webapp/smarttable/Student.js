var app = angular.module("myApp",['smartTable.table']);
app.controller("stuController", function($scope,$http){
	// 分页配置
	$scope.itemsByPage = 10; // 每页条数
	$scope.maxSize = 8; // 显示的页数
	$scope.currentPage = 1; // 当前页
	$scope.dataNumber = 1; // 数据总条数
	$scope.numberOfPages = Math.ceil($scope.dataNumber/$scope.itemsByPage); // 总页数
	// 监听是否翻页
	$scope.$watch('currentPage + itemsByPage', function (){
		$scope.searchdic();
	});
	///新增方法开始*************
	$scope.addForm = {};
	$scope.addDic=function(){
		console.log($scope.addForm);
		$http({
			contentType:'application/text;charset=UTF-8',
			data:JSON.stringify($scope.addForm),
			method:'post',
			url:'http://10.136.24.55:8018/stuapp/dig/stu'
		    })
			.success(function(data){
				json=JSON.parse(data.data);
				console.log(json);
				if(json.result){
					showTip("success","新增成功");
					$('#add_dig').modal('hide');
					//新增成功后查询
					$scope.searchForm.name = angular.copy($scope.addForm.name);
					$scope.searchdic();
					//将表单数据清空
					$scope.addForm={};
				}else{
					showTip("warning","新增失败");
				}
		    })
		    .error(function(){
		    	showTip("danger","失败");
		    });
	}
	//查询开始
	$scope.reset=function(){
		$scope.searchForm = {};
	}
	$scope.reset();
	//搜索按钮查询 从1页开始
	$scope.searchdidic = function(){
		$scope.currentPage = 1;
		$scope.searchdic();
	}
	// 查询诊断字典
	$scope.searchdic = function(){
		$scope.searchForm.pageNo = $scope.currentPage;
		$scope.searchForm.pageSize = $scope.itemsByPage;
		console.log($scope.searchForm);
		$http({
			method:'GET',
			url:'http://10.136.24.55:8018/stuapp/dig/stu', 
			params:$scope.searchForm
			})
			.success(function(data){
				console.log(JSON.parse(data.data));
				json=JSON.parse(data.data);
				jsonrows = JSON.parse(json.rows);
				$scope.attributes=jsonrows;
				$scope.dataNumber = json.total;
				$scope.numberOfPages = Math.ceil($scope.dataNumber/$scope.itemsByPage);
			})
		    .error(function(){
		    	showTip("danger","查询失败");
		    });
    }
	//编辑开始
	$scope.alterForm = {};
	$scope.setValue1 = function(obj){
		$scope.alterForm = angular.copy(obj);
		if(null != $scope.alterForm.birthday && "" != $scope.alterForm.birthday){
			$scope.alterForm.birthday = new Date($scope.alterForm.birthday);
		}
		console.log($scope.alterForm);
	}
	
	$scope.Edit = function () {
		$http({
			contentType:'application/text;charset=UTF-8',
			data:JSON.stringify($scope.alterForm),
			method:'put',
			url:'http://10.136.24.55:8018/stuapp/dig/stu/'+$scope.alterForm.id
		    })
			.success(function(data){
				console.log(JSON.parse(data.data));
				json=JSON.parse(data.data);
				if(json.result){
					showTip("success","修改成功");
					$('#edit_dig').modal('hide');
					//修改成功后执行查询
					$scope.searchForm.name = angular.copy($scope.searchForm.name);
					$scope.searchdic();
				}else{
					showTip("warning","修改失败");
				}
		    })
		    .error(function(){
		    	showTip("danger","失败");
		    });
	}
	//删除方法开始
	$scope.setValue2 = function(obj){
		$scope.id = obj.id;
	}
    $scope.Remove = function () {
    	console.log($scope.id);
    	console.log($scope.searchForm.name);
    	$http({
			contentType:'application/text;charset=UTF-8',
			method:'delete',
			url:'http://10.136.24.55:8018/stuapp/dig/stu'+'/'+$scope.id
		    })
			.success(function(data){
				console.log(data);
				if(data.data=="1"){
					showTip("success","删除成功");
					$('#delete').modal('hide');
					$scope.searchForm.name = angular.copy($scope.searchForm.name);
					$scope.searchdic();
				}else{
					showTip("warning","删除失败");
				}
		    })
		    .error(function(){
		    	showTip("danger","失败");
		    });
    };
})

