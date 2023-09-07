package com.test.realworldexample.exceptions;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(ItemNotFoundException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ApiError apiError = new ApiError(status, ex.getMessage());

        return ResponseEntity.status(status).body(apiError);
    }

    @ExceptionHandler(MaxUploadSizeException.class)
    protected ResponseEntity<Object> handleMaxUploadSize(MaxUploadSizeException ex) {
        HttpStatus status = HttpStatus.EXPECTATION_FAILED;
        ApiError apiError = new ApiError(status, ex.getMessage());

        return ResponseEntity.status(status).body(apiError);
    }

    @ExceptionHandler(MissingItemException.class)
    protected ResponseEntity<Object> handleMissingItem(MissingItemException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ApiError apiError = new ApiError(status, ex.getMessage());

        return ResponseEntity.status(status).body(apiError);
    }

    @ExceptionHandler(WrongArgumentException.class)
    protected ResponseEntity<Object> handleWrongArgument(WrongArgumentException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ApiError apiError = new ApiError(status, ex.getMessage());

        return ResponseEntity.status(status).body(apiError);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable Object body, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        ApiError apiError = new ApiError((HttpStatus) status, ex.getMessage());

        return ResponseEntity.status(status).body(apiError);
    }

}