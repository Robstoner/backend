package com.test.realworldexample.security;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    private String token;
    private Date expirationDate;
    @Builder.Default
    private Boolean expired = false;
}
