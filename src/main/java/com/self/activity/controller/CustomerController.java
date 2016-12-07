package com.taikang.healthcare.demo.controller;

import javax.annotation.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.taikang.healthcare.demo.service.CustomerService;
import com.taikang.healthcare.demo.vo.QueryCustParam;
import com.taikang.healthcare.sdk.bean.PageBean;
import com.taikang.healthcare.sdk.bean.Result;
import com.taikang.healthcare.demo.model.Customer;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("customer/app/v1")
public class CustomerController {
	@Resource
	private CustomerService customerService;
	@ApiOperation(value="客户注册",notes="客户注册接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="customer",required=true,value = "customer对象",dataType="Customer",paramType="body"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(method=RequestMethod.POST,produces="application/json;charset='UTF-8'")
	public Result<Customer> register(@RequestBody Customer customer,@RequestHeader HttpHeaders headers){
		Result<Customer> result = customerService.register(customer, headers);
		return result;
	}
	@ApiOperation(value="客户更新",notes="客户更新接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="customer",required=true,value = "customer对象",dataType="Customer",paramType="body"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="{id}",method=RequestMethod.PUT,produces="application/json;charset='UTF-8'")
	public Result<Customer> alter(@PathVariable Long id,@RequestBody Customer customer,@RequestHeader HttpHeaders headers){
		customer.setId(id);
		Result<Customer> result = customerService.alter(customer,headers);
		return result;
	}
	@ApiOperation(value="客户查询",notes="客户查询接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="name",required=false,value = "名称",dataType="String",paramType="query"),
		@ApiImplicitParam(name="idCardNo",required=false,value = "身份证号",dataType="String",paramType="query"),
		@ApiImplicitParam(name="email",required=false,value = "邮箱",dataType="String",paramType="query"),
		@ApiImplicitParam(name="birthday",required=false,value = "出生日期",dataType="Date",paramType="query"),
		@ApiImplicitParam(name="mobile",required=false,value = "移动电话",dataType="String",paramType="query"),
		@ApiImplicitParam(name="tel",required=false,value = "固定电话",dataType="String",paramType="query"),
		@ApiImplicitParam(name="nickname",required=false,value = "昵称",dataType="String",paramType="query"),
		@ApiImplicitParam(name="number",required=false,value = "页码",dataType="Int",paramType="query"),
		@ApiImplicitParam(name="size",required=false,value = "每页条数",dataType="Int",paramType="query"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(method=RequestMethod.GET,produces="application/json;charset='UTF-8'")
	public Result<Customer> search(QueryCustParam custparam,PageBean pageBean,@RequestHeader HttpHeaders headers){
		Result<Customer> result = customerService.search(custparam,pageBean,headers);
		return result;
	}
	@ApiOperation(value="客户数量查询",notes="客户数量查询接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="name",required=false,value = "姓名",dataType="String",paramType="query"),
		@ApiImplicitParam(name="idCardNo",required=false,value = "身份证号",dataType="String",paramType="query"),
		@ApiImplicitParam(name="email",required=false,value = "邮箱",dataType="String",paramType="query"),
		@ApiImplicitParam(name="birthday",required=false,value = "出生日期",dataType="Date",paramType="query"),
		@ApiImplicitParam(name="mobile",required=false,value = "移动电话",dataType="String",paramType="query"),
		@ApiImplicitParam(name="tel",required=false,value = "固定电话",dataType="String",paramType="query"),
		@ApiImplicitParam(name="nickname",required=false,value = "昵称",dataType="String",paramType="query"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/count",method=RequestMethod.GET,produces="application/json;charset='UTF-8'")
	public Result<PageBean> searchCount(Customer customer,@RequestHeader HttpHeaders headers){
		Result<PageBean> result = customerService.searchCount(customer,headers);
		return result;
	}
	@ApiOperation(value="客户单体查询",notes="客户单体查询接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",required=true,value = "客户id",dataType="Long",paramType="path"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/{id}",method=RequestMethod.GET,produces="application/json;charset='UTF-8'")
	public Result<Customer> searchById(@PathVariable Long id,@RequestHeader HttpHeaders headers){
		Result<Customer> result = customerService.searchById(id,headers);
		return result;
	}
	@ApiOperation(value="客户删除",notes="客户删除接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",required=true,value = "客户id",dataType="Long",paramType="path"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/{id}",method=RequestMethod.DELETE,produces="application/json;charset='UTF-8'")
	public Result<Long> delete(@PathVariable Long id,@RequestHeader HttpHeaders headers){
		Result<Long> result = customerService.delete(id,headers);
		return result;
	}
}