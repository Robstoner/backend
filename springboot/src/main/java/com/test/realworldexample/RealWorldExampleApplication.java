package com.test.realworldexample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import com.test.realworldexample.files.FileServiceI;

import jakarta.annotation.Resource;

@SpringBootApplication
@RestController
public class RealWorldExampleApplication {
	@Resource
	FileServiceI storageService;

	public static void main(String[] args) {
		SpringApplication.run(RealWorldExampleApplication.class, args);
	}

}
