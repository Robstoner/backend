package com.test.realworldexample.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.test.realworldexample.product.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String address;

    @Enumerated(EnumType.STRING)
    private Role[] roles;

    @Enumerated(EnumType.STRING)
    @Default
    private Provider provider = Provider.LOCAL;

    private String avatarUrl;

    @Default
    @OneToMany(mappedBy = "user")
    private List<Product> products = new ArrayList<>();

    private final Date createdAt = new Date(System.currentTimeMillis());

    private final boolean enabled = true;

    public void addProducts(Iterable<Product> products) {

        for (Product product : products) {
            product.setUser(this);
            this.products.add(product);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        }

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getUsername() {
        return email;
    }

}
