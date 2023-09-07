package com.test.realworldexample.exceptions;

public class WrongArgumentException extends RuntimeException {
    
    public WrongArgumentException(String message) {
        super("Wrong argument: " + message);
    }
}
