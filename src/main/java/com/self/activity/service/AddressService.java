package com.self.activity.service;

import java.util.List;

import javax.annotation.Resource;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import com.self.activity.common.Constants;
import com.self.activity.sdk.bean.Result;
import com.self.activity.vo.ProvinceForSolr;

@Service("addressService")
public class AddressService {
	@Resource
	private RestTemplate client;
	
	public Result<List<ProvinceForSolr>> searchPro(String context,Pageable pageable,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		ResponseEntity<Result<List<ProvinceForSolr>>> response;
		try {
			response = client.exchange(
					Constants.PROVINCE+"?context="+context+"&page="+pageable.getPageNumber()+"&size="+pageable.getPageSize(), HttpMethod.GET, requestEntity,
					new ParameterizedTypeReference<Result<List<ProvinceForSolr>>>() {
					});
		} catch (RestClientException e) {
			return new Result("10003", e);
		}
		//Result body = response.getBody();
		//System.out.println(JSON.toJSONString(body));
		Result<List<ProvinceForSolr>> obj =response.getBody();
		List<ProvinceForSolr> data = obj.getData();
		System.out.println(data);
		for (ProvinceForSolr provinceForSolr : data) {
			System.out.println(provinceForSolr.getProvinceId());
		}
		return obj;
	}
	public Result<ProvinceForSolr> save(ProvinceForSolr provinceForSolr,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(provinceForSolr,headers);
		ResponseEntity<Result<ProvinceForSolr>> response;
		try {
			response = client.exchange(
					Constants.PROVINCE, HttpMethod.POST, requestEntity,
					new ParameterizedTypeReference<Result<ProvinceForSolr>>() {
					});
		} catch (RestClientException e) {
			return new Result<ProvinceForSolr>("10003", e);
		}
		return response.getBody();
	}
	public Result<ProvinceForSolr> delete(String id ,HttpHeaders headers){
		HttpEntity<?> requestEntity = new HttpEntity<>(null,headers);
		ResponseEntity<Result> response;
		try {
			response = client.exchange(
					Constants.PROVINCE, HttpMethod.DELETE, requestEntity,
					Result.class);
		} catch (RestClientException e) {
			return new Result("10003", e);
		}
		return response.getBody();
	}
}
