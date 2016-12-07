package com.taikang.healthcare.demo;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.sleuth.Sampler;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 边缘服务层的启动类
 * @author itw_huomb
 */
@MapperScan("com.taikang.healthcare.cis.dig.dao")
@EnableDiscoveryClient
@EnableCircuitBreaker
@SpringBootApplication
public class ComDemoAppApplication
{
	@Bean
	Sampler sampler()
	{
		return span -> true;
	}
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate()
	{
		//构造器中指定编码格式
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
		MediaType mediaType=new MediaType("application","json",Charset.forName("UTF-8"));
		List<MediaType> mediaTypes=new ArrayList<MediaType>();
		mediaTypes.add(mediaType);
		MappingJackson2HttpMessageConverter m2hc=new MappingJackson2HttpMessageConverter();
		m2hc.setSupportedMediaTypes(mediaTypes);
		messageConverters.add(m2hc);
		messageConverters.add(new StringHttpMessageConverter(StandardCharsets.UTF_8));
		messageConverters.add(new AllEncompassingFormHttpMessageConverter());
		RestTemplate template = new RestTemplate(messageConverters);
		return template;
	}
	public static void main(String[] args)
	{
		SpringApplication.run(ComDemoAppApplication.class, args);
	}
}
