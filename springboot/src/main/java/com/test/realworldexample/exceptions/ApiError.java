package com.test.realworldexample.exceptions;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {
    private String timestamp;
    private HttpStatus status;
    private Integer statusCode;
    private String message;
    private List<String> errors;

    public ApiError(HttpStatus status, String message, List<String> errors) {
        super();
        this.timestamp = LocalDateTime.now().toString();
        this.status = status;
        this.statusCode = status.value();
        this.message = message;
        this.errors = errors;
    }

    public ApiError(HttpStatus status, String message, String error) {
        super();
        this.timestamp = LocalDateTime.now().toString();
        this.status = status;
        this.statusCode = status.value();
        this.message = message;
        this.errors = Arrays.asList(error);
    }

    public ApiError(HttpStatus status, String message) {
        super();
        this.timestamp = LocalDateTime.now().toString();
        this.status = status;
        this.statusCode = status.value();
        this.message = message;
    }
}
