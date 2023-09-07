package com.test.realworldexample.product;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.realworldexample.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String sizes;

    private String imageUrl;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Transient
    private String userId;

    private final Date createdAt = new Date(System.currentTimeMillis());

    public String getUserId() {
        if (user != null)
            return user.getId();
        else
            return null;
    }
}
