function test(){
	alert($("#aa").val());
}
$(function(){
	$( "#aaa" ).sisyphus({
		locationBased: true, 
		excludeFields: $( "#c1" ), //排除
		timeout: 10,
		onBeforeSave: function() {
			console.log("开始保存"+new Date());
			}
	});
});