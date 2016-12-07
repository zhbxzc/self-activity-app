package com.self.activity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.self.activity.common.Constants;
import com.self.activity.model.Customer;
import com.self.activity.sdk.bean.PageBean;
import com.self.activity.sdk.bean.Result;
import com.self.activity.vo.CustomerVO;
import com.self.activity.vo.QueryCustParam;

@Service("customerService")
public class CustomerService {
	@Autowired
	RestTemplate client;
	
	//@HystrixCommand(fallbackMethod = "registerhystrixMapParam")
	public Result<Customer> register(CustomerVO customer,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(customer,headers);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					Constants.CUSTOMER, HttpMethod.POST, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result("10003", e);
		}
		return response.getBody();
	}
	
	public Result<Customer> registerhystrixMapParam(CustomerVO customer,HttpHeaders headers)
	{
		Result<Customer> result = new Result<Customer>("10003");
		return result;
	}
	
	
	//@HystrixCommand(fallbackMethod = "alterhystrixMapParam")
	public Result<Customer> alter(CustomerVO customer,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(customer,headers);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					Constants.CUSTOMER+"/"+customer.getId(), HttpMethod.PUT, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result<Customer>("10006", e);
		}
		return response.getBody();
	}
	
	public Result<Customer> alterhystrixMapParam(Customer customer,HttpHeaders headers)
	{
		Result<Customer> result = new Result<Customer>("10006");
		return result;
	}
	
	//@HystrixCommand(fallbackMethod = "searchhystrixMapParam")
	public Result<Customer> search(QueryCustParam custparam,PageBean pageBean,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		String url = Constants.CUSTOMER+custparam.toURL(pageBean);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					url, HttpMethod.GET, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result<Customer>("10008", e);
		}
		return response.getBody();
	}
	
	public Result<Customer> searchhystrixMapParam(QueryCustParam customer,HttpHeaders headers)
	{
		Result<Customer> result = new Result<Customer>("10008");
		return result;
	}
	
	
	//@HystrixCommand(fallbackMethod = "searchByIdhystrixMapParam")
	public Result<Customer> searchById(String id,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					Constants.CUSTOMER+"/"+id, HttpMethod.GET, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result<Customer>("10015", e);
		}
		return response.getBody();
	}
	
	public Result<Customer> searchByIdhystrixMapParam(Long id,HttpHeaders headers)
	{
		Result<Customer> result = new Result("10015");
		return result;
	}
	
	
	//@HystrixCommand(fallbackMethod = "deletehystrixMapParam")
	public Result<Long> delete(String id,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					Constants.CUSTOMER+"/"+id, HttpMethod.DELETE, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result<Long>("10013", e);
		}
		return response.getBody();
	}
	
	public Result<Customer> deletehystrixMapParam(Long id,HttpHeaders headers)
	{
		Result<Customer> result = new Result<Customer>("10013");
		return result;
	}
	
	
	//@HystrixCommand(fallbackMethod = "searchCounthystrixMapParam")
	public Result<PageBean> searchCount(QueryCustParam customer,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		String url = Constants.CUSTOMER+"/count"+customer.toURL(null);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					url, HttpMethod.GET, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result<PageBean>("10010", e);
		}
		return response.getBody();
	}
	
	public Result searchCounthystrixMapParam(Customer customer,HttpHeaders headers)
	{
		Result result = new Result("10010");
		return result;
	}
}
