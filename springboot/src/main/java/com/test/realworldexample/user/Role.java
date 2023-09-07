package com.test.realworldexample.user;

public enum Role {
    USER,
    ADMIN;

    public static boolean contains(String test) {

        for (Role c : Role.values()) {
            if (c.name().equals(test.toUpperCase())) {
                return true;
            }
        }
    
        return false;
    }
}
