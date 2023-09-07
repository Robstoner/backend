package com.test.realworldexample.exceptions;

public class MaxUploadSizeException extends RuntimeException {

    public MaxUploadSizeException(String message) {
        super(message);
    }
}
