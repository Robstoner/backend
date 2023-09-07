package com.test.realworldexample.config;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.test.realworldexample.exceptions.ItemNotFoundException;
import com.test.realworldexample.security.Token;
import com.test.realworldexample.security.TokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Autowired
    private final TokenRepository tokenRepository;

    public JwtService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    private static final String SECRET_KEY = "afedf40a616458067532f4255ce8940868b64b41ffa22e73f060aefa24a27546";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(Map.of(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);
        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        Token tokenObj = Token.builder()
                .token(token)
                .expirationDate(expiration)
                .build();
        tokenRepository.save(tokenObj);

        return token;
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        Token tokenObj = tokenRepository.findById(token)
                .orElse(null);
        if (tokenObj == null) {
            return false;
        }

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Token tokenObj = tokenRepository.findById(token)
                .orElseThrow(() -> new ItemNotFoundException("Token not found"));
        if (tokenObj.getExpired()) {
            return true;
        }
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] key = Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(key);
    }
}
