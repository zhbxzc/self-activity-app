package com.self.activity.controller;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.self.activity.sdk.bean.PageBean;
import com.self.activity.sdk.bean.Result;
import com.self.activity.sdk.util.Loggers;
import com.self.activity.sdk.util.PatternUtil;
import com.self.activity.service.AddressService;
import com.self.activity.vo.ProvinceForSolr;
import com.self.activity.vo.QueryCustParam;
import com.self.activity.vo.QueryCustResult;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("address")
@Api(description="地址管理")
public class AddressController {
	@Resource
	private AddressService addressService;
	@ApiOperation(value="省solr查询",notes="省solr查询接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="context",required=false,value = "名称",dataType="String",paramType="query"),
		@ApiImplicitParam(name="page",required=false,value = "页码(从0开始)",dataType="Int",paramType="query"),
		@ApiImplicitParam(name="size",required=false,value = "每页条数",dataType="Int",paramType="query"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/province",method=RequestMethod.GET,produces="application/json;charset='UTF-8'")
	public Result<List<ProvinceForSolr>> searchPro(@RequestParam(required=true) String context,Pageable pageable,@RequestHeader HttpHeaders headers){
		Result<List<ProvinceForSolr>> result=addressService.searchPro(context,pageable, headers);
		return result;
	}
	@ApiOperation(value="省solr插入",notes="省solr插入接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="context",required=true,value = "省对象",dataType="ProvinceForSolr",paramType="body"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/province",method=RequestMethod.POST,produces="application/json;charset='UTF-8'")
	public Result<ProvinceForSolr> savePro(@RequestBody(required=true) ProvinceForSolr context,@RequestHeader HttpHeaders headers){
		Result<ProvinceForSolr> result=addressService.save(context,headers);
		return result;
	}
/*	@ApiOperation(value="省solr删除",notes="省solr删除接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",required=true,value = "省对象",dataType="String",paramType="path"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/province/{id}",method=RequestMethod.DELETE,produces="application/json;charset='UTF-8'")
	public Result<ProvinceForSolr> deletePro(@PathVariable String id,@RequestHeader HttpHeaders headers){
		addressService.delete(id,headers);
		return result;
	}*/
	/*@ApiOperation(value="省solr更新",notes="省solr更新接口")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",required=true,value = "省对象",dataType="String",paramType="path"),
		@ApiImplicitParam(name="provinceForSolr",required=true,value = "省对象",dataType="ProvinceForSolr",paramType="body"),
		@ApiImplicitParam(name = "TK_BUSINESS_SERIALID", value = "交易流水", required = true,dataType="String",paramType="header",defaultValue="11111"),
		@ApiImplicitParam(name = "TK_REQUEST_SYS_CODE", value = "请求方系统编码", required = false,dataType="String",paramType="header",defaultValue="22222"),
		@ApiImplicitParam(name = "TK_REQUEST_MODULE_CODE", value = "请求方模块编码", required = false,dataType="String",paramType="header",defaultValue="33333"),
		@ApiImplicitParam(name = "TK_REQUEST_NODE_IP", value = "请求方节点IP", required = false,dataType="String",paramType="header",defaultValue="44444"),
		@ApiImplicitParam(name = "Accept", value = "接收属性", required = true,dataType="String",paramType="header",defaultValue="application/json"),
		@ApiImplicitParam(name = "Accept-Charset", value = "接收字符集", required = true,dataType="String",paramType="header",defaultValue="utf-8"),
		@ApiImplicitParam(name = "Content-Type", value = "内容类型", required = true,dataType="String",paramType="header",defaultValue="application/json; charset=UTF-8")
	})
	@RequestMapping(value="/province/{id}",method=RequestMethod.PUT,produces="application/json;charset='UTF-8'")
	public Result<ProvinceForSolr> alterPro(@PathVariable String id,@RequestBody ProvinceForSolr provinceForSolr, @RequestHeader HttpHeaders headers){
		provinceForSolr.setId(id);
		provinceService.save(provinceForSolr);
		Result<ProvinceForSolr> result=new Result<ProvinceForSolr>("0",provinceForSolr);
		return result;
	}*/
}
