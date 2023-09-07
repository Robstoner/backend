package com.test.realworldexample.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

    Optional<User> findByEmail(String email);
}
