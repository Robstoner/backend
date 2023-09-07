package com.test.realworldexample.security;

import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token, String>{
    
}
