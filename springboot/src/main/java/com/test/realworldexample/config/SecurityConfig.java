package com.test.realworldexample.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.test.realworldexample.oauth.CustomOAuth2UserService;
import com.test.realworldexample.user.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        @Autowired
        private final JwtAuthenticationFilter jwtAuthFilter;
        @Autowired
        private final AuthenticationProvider authenticationProvider;
        @Autowired
        private CustomOAuth2UserService oauthUserService;
        @Autowired
        private UserService userService;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http

                        .csrf((csrf) -> csrf.disable())
                        .authorizeHttpRequests((authorize) -> authorize
                                .requestMatchers("/auth/**", "/oauth2/**", "/swagger-ui*", "/swagger-ui/**",
                                                "/swagger-resources/*", "/api-docs/**")
                                .permitAll()
                                .anyRequest().authenticated())
                        .sessionManagement((session) -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .authenticationProvider(authenticationProvider)
                        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
                // .oauth2Login((oauth2) -> oauth2
                // .userInfoEndpoint((userInfoEndpoint) -> userInfoEndpoint
                // .userService(oauthUserService))
                // .successHandler(new AuthenticationSuccessHandler() {

                // @Override
                // public void onAuthenticationSuccess(HttpServletRequest request,
                // HttpServletResponse response,
                // Authentication authentication) throws IOException, ServletException {
                // DefaultOidcUser oauthUser = (DefaultOidcUser) authentication.getPrincipal();

                // userService.processOAuthPostLogin(oauthUser.getEmail());

                // response.sendRedirect("/");
                // }
                // }))

                return http.build();
        }
}
