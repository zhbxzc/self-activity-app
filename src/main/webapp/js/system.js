
angular.module('myApp',['ui.router'])
       .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
       		$urlRouterProvider.when('', '/another');
    		$stateProvider
    		.state('another', {
	          url: '/another',
	          templateUrl: './template/another.html',
	          controller:'aliasController'
	       })
	       .state('favoriteDept', {
	          url: '/favoriteDept',
	          templateUrl: './template/favoriteDept.html',
	          controller:'favoriteDeptController'
	       })
	       .state('favoriteUser', {
	          url: '/favoriteUser',
	          templateUrl: './template/favoriteUser.html',
	          controller:'favoriteUserController'
	       })
	      
       }])
       .controller('favoriteDeptController',['$scope','$http',function($scope,$http){
    	   
       var deleteDeptArray = new Array();
       //先拿到token，然后去获取科室常用模板
      /* var token = "41161c0f-146b-474b-a036-5a429447f3cd";
       $http.get("http://"+window.location.host+"/dicapp/getValuesFromRedisByToken/"+token)
        .success(function(data, status, headers, config) {
        	$scope.favoriteDept =data.data;
        })
        .error(function(data, status, headers, config) {
          console.log("error:" + JSON.stringify(data));
          $scope.result_data = JSON.stringify(data);
        });*/
       
        //先写死返回值
        var data = {"status":"success","data":[{"deptName":"脑外科","orgId":201,"orgCode":"201","deptCode":null,"orgName":"北京爱神医院","deptId":201}],"error_message":"","error_code":0};
       	$scope.favoriteDept =data.data;
       	
        //通过科室常用模板下拉框中选择的科室的ID，去查询科室模板
        $scope.myFunc=function(){
	   		var deptId = $scope.myValue.deptId;
	   		getFavoriteDept(deptId);
        }
    	function getFavoriteDept(deptId){
    		 $http.get("http://"+window.location.host+"/dicapp/selectItemsByDeptId/"+deptId)
    	        .success(function(data, status, headers, config) {
    	          getFavoriteDeptList($scope, data);
    	        })
    	        .error(function(data, status, headers, config) {
    	          console.log("error:" + JSON.stringify(data));
    	          $scope.result_data = JSON.stringify(data);
    	        });
    	}
     	
     	//获取患者的诊断信息列表 
  		  function getFavoriteDeptList($scope,data){
  			  if(data.status=="success"){
  				 $scope.item =data.data;
 				  }
                if(data.status=="failure"){
                	alert("服务器端出错了!!");
                } 
  			  
  		  }
 	      function showResult(data, status, headers, config) {
 		        $scope.result_data = JSON.stringify(data);
 		        if(data.status=="success"){
 		          $scope.resultList = data.data;
 		        } else {
 		        	alert("服务器端出错了!!");
 		        }
 	      }
 	      
 	     /** start  拼音首字母、汉字和ICD编码输入提示*/
  	     $scope.show = {value: null};
      	//获取焦点时，判断是否显示查询详情列表
      	$scope.focus=function(item,index){
       		if(item.name){
       			$scope.show.value = index;
       		}
       		
  	     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.name+"&start=0&rows=10";
    	        $http.get(url,{headers:{}})
     	        .success(function(data, status, headers, config) {
     	        	getDicIndex(data, status, headers, config);   	        	
     	        		
     	 	        })
  	 	        .error(function(data, status, headers, config) {
  	 	          console.log("error:" + JSON.stringify(data));
  	 	          $scope.result_data = JSON.stringify(data);
  	 	        });
       	}
      	//每次输入时，显示查询详情
       	$scope.calculate=function(item,index){
       		if(item.name){
       			$scope.show.value = index;
       		}else{
       			$scope.show.value = null;
       		}
       		var num =$scope.num.value;
  	     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.name+"&start="+0+"&rows=10";
    	        $http.get(url,{headers:{}})
     	        .success(function(data, status, headers, config) {
     	        	getDicIndex(data, status, headers, config);
     	 	        })
  	 	        .error(function(data, status, headers, config) {
  	 	          console.log("error:" + JSON.stringify(data));
  	 	          $scope.result_data = JSON.stringify(data);
  	 	        });
       	}
  	      function getDicIndex(data, status, headers, config) {
  		        if(data.status=="success"){
  		        	$scope.ittm = data.data.data;
  		        	var total =data.data.total;
  		        	if(total>=8){
  		        		$scope.btndisplay=true;
  		        	}
  		        } else {
  		        	alert("服务器端出错了!!");
  		        }
  		  }
  	      //点击查询结果，显示
  	     	$scope.click=function(item,it,index,$event){
  	     		$event.stopPropagation();
  	     		item.name = it.name ;
  	     		item.icd_code = it.icd_code ;
  	     		item.id= it.id;
  	     	//	$scope.show.value = index;

  	     		$scope.show = {value: null};

  	     	}
  	     	
  	     	 $scope.act = {judge: null};
  	     	//鼠标滑入时，高亮
  	     	$scope.mouseover=function(index){
  	     		$scope.act.judge=index;
  	     	}
  	     	//鼠标滑出时，取消高亮
  	     	$scope.mouseout=function(index){
  	     		$scope.act.judge=null;
  	     	}
  	     	//点击li列表时，阻止冒泡
  	     	$scope.avoid=function($event){
  	     		$event.stopPropagation();
  	     	}
  	     	//下一页，加载
  	     	$scope.btndisplay=false;
  	     	$scope.num={value :0} ;
  	     	$scope.downloadmore=function(index,$event){
  	     	   $scope.show.value = index;
  	     	   $event.stopPropagation();
  	     		$scope.num.value += 1 ;
  	     		console.log($scope.num.value);
  	     	}
  	     	
  	     	//点击其他区域，查询信息框消失
  	     	$(function(){
  	     		$('html').on('click',function(){
	     			$scope.$apply(function(){
	     				$scope.show.value = null;
	     			})
	     		})
  	     	})
  	     //删除当前信息
  		  $scope.remove=function(index){
  		     	$scope.item.splice(index,1);
  		     }
  	/** end*/
 	      
 		  //删除功能
 	      $scope.deleteFavoriteDept=function(i){
 	    	  $scope.item.splice($scope.item.indexOf(i),1);
	    	 
 	 	      var favoriteDept = {};
 	 	      favoriteDept.deptId = i.deptId;
 	 	      favoriteDept.itemId = i.id;
 	 	      favoriteDept.sortNo = i.sortNo;
 	 	      
 	 	      deleteDeptArray.push(favoriteDept);
 	 	       
 	           
 	      }
 	      
 	     //保存
 	      $scope.saveFavoriteDept=function(item){
 	    	  
        	  if(angular.isArray(item)&&item.length>0){
        		  var saveDeptArray =[];
        		    angular.forEach(item,function(data){
        		    	var favoriteDept={};
        		    	if(data.deptId!=undefined&&data.deptId!=null){
        		    		favoriteDept.deptId=data.deptId;
        		    	}
        		    	if(data.id!=undefined&&data.id!=null){
        		    		favoriteDept.itemId=data.id;
        		    	}
        		    	if(data.sortNo!=undefined&&data.sortNo!=null){
        		    		favoriteDept.sortNo=data.sortNo;
        		    	}
        		    	//暂时先写死的
        		    	favoriteDept.sortNo='1';
        		    	saveDeptArray.push(favoriteDept);
        		    });	   
        		    
        		    //保存
        		    var url = "http://"+window.location.host+"/dicapp/favoriteDept";
        		    
        		    $http.post(url, JSON.stringify(saveDeptArray))
		 	     	.success(function(data, status, headers, config) {
		 	     		getFavoriteDeptList($scope, data);
			        })
			        .error(function(data, status, headers, config) {
			          console.log("error:" + JSON.stringify(data));
			          $scope.result_data = JSON.stringify(data);
			        });
        		     
        		   
        	  }
	     
        	  //删除
 	    	   var url = "http://"+window.location.host+"/dicapp/deleteFavoriteDept";
 	    	 
 	    	   $http.post(url, JSON.stringify(deleteDeptArray))
	 	     	.success(function(data, status, headers, config) {
		          getFavoriteDeptList($scope, data);
		        })
		        .error(function(data, status, headers, config) {
		          console.log("error:" + JSON.stringify(data));
		          $scope.result_data = JSON.stringify(data);
		        });
 	    	 
 	   
 	      
 	      }
       }])
       .controller('favoriteUserController',['$scope','$http',function($scope,$http){
    	   
       var deleteUserArray = new Array();
       //先拿到userId，然后去获取用户常用模板
       var userId = "11";
	   $http.get("http://"+window.location.host+"/dicapp/selectItemsByUserId/"+userId)
	        .success(function(data, status, headers, config) {
	          getFavoriteUserList($scope, data);
	        })
	        .error(function(data, status, headers, config) {
	          console.log("error:" + JSON.stringify(data));
	          $scope.result_data = JSON.stringify(data);
	        });
     	
     	//获取患者的诊断信息列表 
  		  function getFavoriteUserList($scope,data){
  			  if(data.status=="success"){
  				 $scope.item =data.data;
 				  }
                if(data.status=="failure"){
                	alert("服务器端出错了!!");
                } 
  			  
  		  }
 	      function showResult(data, status, headers, config) {
 		        $scope.result_data = JSON.stringify(data);
 		        if(data.status=="success"){
 		          $scope.resultList = data.data;
 		        } else {
 		        	alert("服务器端出错了!!");
 		        }
 	      }
 	      
 	     /** start  拼音首字母、汉字和ICD编码输入提示*/
 	     $scope.show = {value: null};
     	//获取焦点时，判断是否显示查询详情列表
     	$scope.focus=function(item,index){
      		if(item.name){
      			$scope.show.value = index;
      		}
      		
 	     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.name+"&start=0&rows=10";
   	        $http.get(url,{headers:{}})
    	        .success(function(data, status, headers, config) {
    	        	getDicIndex(data, status, headers, config);   	        	
    	        		
    	 	        })
 	 	        .error(function(data, status, headers, config) {
 	 	          console.log("error:" + JSON.stringify(data));
 	 	          $scope.result_data = JSON.stringify(data);
 	 	        });
      	}
     	//每次输入时，显示查询详情
      	$scope.calculate=function(item,index){
      		if(item.name){
      			$scope.show.value = index;
      		}else{
      			$scope.show.value = null;
      		}
      		var num =$scope.num.value;
 	     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.name+"&start="+0+"&rows=10";
   	        $http.get(url,{headers:{}})
    	        .success(function(data, status, headers, config) {
    	        	getDicIndex(data, status, headers, config);
    	 	        })
 	 	        .error(function(data, status, headers, config) {
 	 	          console.log("error:" + JSON.stringify(data));
 	 	          $scope.result_data = JSON.stringify(data);
 	 	        });
      	}
 	      function getDicIndex(data, status, headers, config) {
 		        if(data.status=="success"){
 		        	$scope.ittm = data.data.data;
 		        	var total =data.data.total;
 		        	if(total>=8){
 		        		$scope.btndisplay=true;
 		        	}
 		        } else {
 		        	alert("服务器端出错了!!");
 		        }
 		  }
 	      //点击查询结果，显示
 	     	$scope.click=function(item,it,index,$event){
 	     		$event.stopPropagation();
 	     		item.name = it.name ;
 	     		item.icd_code = it.icd_code ;
 	     		item.id= it.id;
 	     	//	$scope.show.value = index;

 	     		$scope.show = {value: null};

 	     	}
 	     	
 	     	 $scope.act = {judge: null};
 	     	//鼠标滑入时，高亮
 	     	$scope.mouseover=function(index){
 	     		$scope.act.judge=index;
 	     	}
 	     	//鼠标滑出时，取消高亮
 	     	$scope.mouseout=function(index){
 	     		$scope.act.judge=null;
 	     	}
 	     	//点击li列表时，阻止冒泡
 	     	$scope.avoid=function($event){
 	     		$event.stopPropagation();
 	     	}
 	     	//下一页，加载
 	     	$scope.btndisplay=false;
 	     	$scope.num={value :0} ;
 	     	$scope.downloadmore=function(index,$event){
 	     	   $scope.show.value = index;
 	     	   $event.stopPropagation();
 	     		$scope.num.value += 1 ;
 	     		console.log($scope.num.value);
 	     	}
 	     	
 	     	//点击其他区域，查询信息框消失
 	     	$(function(){
 	     		$('html').on('click',function(){
	     			$scope.$apply(function(){
	     				$scope.show.value = null;
	     			})
	     		})
 	     	})
 	     //删除当前信息
 		  $scope.remove=function(index){
 		     	$scope.item.splice(index,1);
 		     }
 	/** end*/
 		     	

 		     	$scope.imgshow = {value: null}
 		     	$scope.showorhide=function(index){
 		     		$scope.imgshow.value=index;
 		     	}

 		     	$scope.isshow=false;
 	      
 		  //删除功能
 	      $scope.deleteFavoriteUser=function(i){
 	    	  $scope.item.splice($scope.item.indexOf(i),1);
	    	 
 	 	      var favoriteUserObj = {};
 	 	      favoriteUserObj.userId = i.userId;
 	 	      favoriteUserObj.itemId = i.id;
 	 	      favoriteUserObj.sortNo = i.sortNo;
 	 	      
 	 	      deleteUserArray.push(favoriteUserObj);
 	 	       
 	           
 	      }
 	      
 	     //保存
 	      $scope.saveFavoriteUser=function(item){
 	    	   

	        	  if(angular.isArray(item)&&item.length>0){
	        		  var saveUserArray =[];
	        		    angular.forEach(item,function(data){
	        		    	var favoriteUser={};
	        		    	if(data.userId!=undefined&&data.userId!=null){
	        		    		favoriteUser.userId=data.userId;
	        		    	}
	        		    	if(data.id!=undefined&&data.id!=null){
	        		    		favoriteUser.itemId=data.id;
	        		    	}
	        		    	if(data.sortNo!=undefined&&data.sortNo!=null){
	        		    		favoriteUser.sortNo=data.sortNo;
	        		    	}
	        		    	//暂时先写死的
	        		    	favoriteUser.sortNo='1';
	        		    	saveUserArray.push(favoriteUser);
	        		    });	   
	        		    //保存
	        		    var url = "http://"+window.location.host+"/dicapp/favoriteUser";
	        		    
	        		    $http.post(url, JSON.stringify(saveUserArray))
			 	     	.success(function(data, status, headers, config) {
			 	     		getFavoriteUserList($scope, data);
				        })
				        .error(function(data, status, headers, config) {
				          console.log("error:" + JSON.stringify(data));
				          $scope.result_data = JSON.stringify(data);
				        });
	        		     
	        		   
	        	  }
		     
	        	  //删除
	        	   var url = "http://"+window.location.host+"/dicapp/deleteFavoriteUser";
	  	    	 
	 	    	   $http.post(url, JSON.stringify(deleteUserArray))
		 	     	.success(function(data, status, headers, config) {
		 	     		getFavoriteUserList($scope, data);
			        })
			        .error(function(data, status, headers, config) {
			          console.log("error:" + JSON.stringify(data));
			          $scope.result_data = JSON.stringify(data);
			        });
 	      
 	      }
       }])
       .controller('aliasController',['$scope','$http',function($scope,$http){
	      function isBlank(data) {
	          return !data || data.trim() == '';
	      }
	      function assembleAlias($scope) {
	          var alias = {};
	          //别名ID
	            alias.id = $scope.id;
	        	alias.itemId=$scope.itemId; 
	          //诊断别名
	          if (!isBlank($scope.name)) {
	            alias.name =$scope.name;
	          }
	          return JSON.stringify(alias);
	        
	      };
	      $scope.item=[{itemId:"",name:"",des:"",spellNo:"",wubiNo:"",createdOrgId:"",createdDeptId:"",createdById:"",icd_code:"",itemName:""}];
	      /** start  拼音首字母、汉字和ICD编码输入提示*/
	    	$scope.show = {value: null};
	    	//获取焦点时，判断是否显示查询详情列表
	    	$scope.focus=function(item,index){
	     		if(item.itemName){
	     			$scope.show.value = index;
	     		}
		     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.itemName+"&start=0&rows=10";
	  	        $http.get(url,{headers:{}})
	   	        .success(function(data, status, headers, config) {
	   	        	getDicIndex(data, status, headers, config);   	        	
	   	        		
	   	 	        })
		 	        .error(function(data, status, headers, config) {
		 	          console.log("error:" + JSON.stringify(data));
		 	          $scope.result_data = JSON.stringify(data);
		 	        });
	     	}
	    	//每次输入时，显示查询详情
	     	$scope.calculate=function(item,index){
	     		if(item.itemName){
	     			$scope.show.value = index;
	     		}else{
	     			$scope.show.value = null;
	     		}
	     		var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.itemName+"&start=0&rows=10";
//		     	var url="http://"+window.location.host+"/dicsolrapp/DicIndex?context="+item.itemName+"&start="+($scope.num.value)*8+"&rows="+($scope.num.value+1)*8;
	  	        $http.get(url,{headers:{}})
	   	        .success(function(data, status, headers, config) {
	   	        	getDicIndex(data, status, headers, config);
	   	 	        })
		 	        .error(function(data, status, headers, config) {
		 	          console.log("error:" + JSON.stringify(data));
		 	          $scope.result_data = JSON.stringify(data);
		 	        });
	     	}
	      function getDicIndex(data, status, headers, config) {
		        if(data.status=="success"){
		        	$scope.ittm = data.data.data;
		        	if($scope.ittm.length>=8){
		        		$scope.btndisplay=true;
		        	}
		        } else {
		        	alert("服务器端出错了!!");
		        }
		  }
	      //判断是否有空行，没有空行返回true
	      function addTr(){
	    	  var falg=true;
	      	  if($scope.item.length>0){
    		    angular.forEach($scope.item,function(data){
    		    	if(data.itemId==undefined||data.itemId==null)//有空行
    		    		falg=false;
    		    });
	    	  }
	      	  return falg;
	      }
		      //点击查询结果，显示
		     	$scope.click=function(item,it,index,$event){
		     		$event.stopPropagation();
		     		item.itemName = it.name ;
		     		item.icd_code = it.icd_code ;
		     		item.itemId=it.id;
		     		$scope.show = {value: null};
		     		if(addTr()){
		     			$scope.item.push({});
		     		}
		     	}
		     	
		     	 $scope.act = {judge: null};
		     	//鼠标滑入时，高亮
		     	$scope.mouseover=function(index){
		     		$scope.act.judge=index;
		     	}
		     	//鼠标滑出时，取消高亮
		     	$scope.mouseout=function(index){
		     		$scope.act.judge=null;
		     	}
		     	//点击li列表时，阻止冒泡
		     	$scope.avoid=function($event){
		     		$event.stopPropagation();
		     	}
		     	//下一页，加载
		     	$scope.btndisplay=false;
		     	$scope.num={value :0} ;
		     	$scope.downloadmore=function(index,$event){
		     	   $scope.show.value = index;
		     	   $event.stopPropagation();
		     		$scope.num.value += 1 ;
		     		console.log($scope.num.value);
		     	}
		     	
		     	//点击其他区域，查询信息框消失
		     	$(function(){
		     		$('html').on('click',function(){
		     			$scope.$apply(function(){
		     				$scope.show.value = null;
		     			})
		     		})
		     	})
		     //删除当前信息
			  $scope.remove=function(index){
		     		if($scope.item.length>1){
		     			$scope.item.splice(index,1);
		     		}
			     }
	/** end*/
	      
	      
	      
    	   /** start  诊断别名详情、编辑、删除、新增*/
	      $scope.getAliasInfo = function(){
	    		var ids=$.map($("#ShowList").bootstrapTable('getSelections'),function(row){
	    			return row.aliasId;
	    		});
		        var url ="http://"+window.location.host+"/aliasApp/alias/"+ids;
		        $http.get(url,{headers:{}})
		        .success(function(data, status, headers, config) {
		          getAliasInfoResult(data, status, headers, config);
		        })
		        .error(function(data, status, headers, config) {
    	          console.log("error:" + JSON.stringify(data));
    	          $scope.result_data = JSON.stringify(data);
		        });
		      }
	      function getAliasInfoResult(data, status, headers, config){
  			  if(data.status=="success"){
  				 $scope.id =data.data.id;
  				 $scope.itemId =data.data.itemId;
   				 $scope.icdCode =data.data.icdCode;
   				 $scope.itemName =data.data.itemName;
   				 $scope.name =data.data.name;
  				  }
                 if(data.status=="failure"){
                 	alert("服务器端出错了!!");
                 } 
	      }
 	      $scope.editAlias = function(){
 	         var url ="http://"+window.location.host+"/aliasApp/alias";
 	         var data = assembleAlias($scope);
 	         $http.put(url, data, {headers:{}})
 	         .success(function(data, status, headers, config) {
 	        	editAliasResult(data, status, headers, config);
 	         })
 	         .error(function(data, status, headers, config) {
 	           console.log("error:" + JSON.stringify(data));
 	         });
 	       }
 	      function editAliasResult(data, status, headers, config){
 	    	  if(data.status=="success"){
 	    		 $('#aliasInfoModal').modal('hide');
 	    		 queryAliasList();
 	    	  }else{
 	    		  alert(data.error_message);
 	    	  }
 	      }
 	      $scope.delAlias=function(){
    		 var ids=$.map($("#ShowList").bootstrapTable('getSelections'),function(row){
    			return row.aliasId;
    		 });
 	          var url = "http://"+window.location.host+"/aliasApp/alias/"+ids;
 	          $http.delete(url)
 	          .success(function(data, status, headers, config) {
 	        	 delAliasResult(data, status, headers, config);
 	        })
 	          .error(function(data, status, headers, config) {
 	        	 console.log("error:" + JSON.stringify(data));
 	        });
 	      }
 	      function delAliasResult(data, status, headers, config){
 	    	  if(data.status=="success"){
 	    		  alert("删除成功");
 	    		  queryAliasList();
 	    	  }else{
 	    		  alert("删除失败");
 	    	  }
 	      }
 	      
 	     $scope.addAliasView=function(){
 	    	$scope.item=[{itemId:"",name:"",des:"",spellNo:"",wubiNo:"",createdOrgId:"",createdDeptId:"",createdById:"",icd_code:"",itemName:""}];
 			$("#adddig").show();
 			$("#manage").hide();
 	     }
 	      $scope.createAlias = function() {
 	      var url = "http://"+window.location.host+"/aliasApp/alias";
      	  if(angular.isArray($scope.item)&&$scope.item.length>0){
    		  var aliasArray =[];
    		    angular.forEach($scope.item,function(data){
    		    	if(data.itemId!=undefined&&data.itemId!=null&&data.itemId!=""){
        		    	var alias={};
        		    	if(data.itemId!=undefined&&data.itemId!=null){
        		    		alias.itemId=data.itemId;
        		    	}
        		    	if(data.name!=undefined&&data.name!=null){
        		    		alias.name=data.name;
        		    	}
        		    	if(data.des!=undefined&&data.des!=null){
        		    		alias.des=data.des;
        		    	}
        		    	if(data.spellNo!=undefined&&data.spellNo!=null){
        		    		alias.spellNo=data.spellNo;
        		    	}
        		    	if(data.wubiNo!=undefined&&data.wubiNo!=null){
        		    		data.wubiNo=data.wubiNo;
        		    	}
        		    	if(data.createdOrgId!=undefined&&data.createdOrgId!=null){
        		    		alias.createdOrgId=data.createdOrgId;
        		    	}
        		    	if(data.createdDeptId!=undefined&&data.createdDeptId!=null){
        		    		alias.createdDeptId=data.createdDeptId;
        		    	}
        		    	if(data.createdById!=undefined&&data.createdById!=null){
        		    		alias.createdById=data.createdById;
        		    	}
        		    	aliasArray.push(alias);
    		    	}
    		    });
    		    if(angular.isArray(aliasArray)&&aliasArray.length>0){
    		    	 var data=JSON.stringify(aliasArray);
         	        $http.post(url,data, {headers:{}})
         	        .success(function(data, status, headers, config) {
         	        	$scope.item=[{itemId:"",name:"",des:"",spellNo:"",wubiNo:"",createdOrgId:"",createdDeptId:"",createdById:"",icd_code:"",itemName:""}];
    	     	 		$("#adddig").hide();
    	     			$("#manage").show();
    	     			queryAliasList();
         	        })
         	        .error(function(data, status, headers, config) {
         	          console.log("error:" + JSON.stringify(data));
         	        });
    		    }
    	  }
 	        
 	      }
 	      
 	      
       }])
       






















