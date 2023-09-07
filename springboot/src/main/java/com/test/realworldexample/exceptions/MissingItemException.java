package com.test.realworldexample.exceptions;

public class MissingItemException extends RuntimeException{
    
    public MissingItemException(String message) {
        super("Item: " + message + " is required.");
    }
}
