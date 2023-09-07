// package com.test.realworldexample.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class OAuth2LoginConfig {

// 	@Bean
// 	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// 		http
// 			.authorizeHttpRequests(authorize -> authorize
// 				.anyRequest().authenticated()
// 			)
// 			.oauth2Login(withDefaults());
// 		return http.build();
// 	}

// 	@Bean
// 	public ClientRegistrationRepository clientRegistrationRepository() {
// 		return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
// 	}

// 	private ClientRegistration googleClientRegistration() {
// 		return ClientRegistration.withRegistrationId("google")
// 			.clientId("google-client-id")
// 			.clientSecret("google-client-secret")
// 			.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
// 			.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
// 			.redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
// 			.scope("openid", "profile", "email", "address", "phone")
// 			.authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
// 			.tokenUri("https://www.googleapis.com/oauth2/v4/token")
// 			.userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
// 			.userNameAttributeName(IdTokenClaimNames.SUB)
// 			.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
// 			.clientName("Google")
// 			.build();
// 	}
// }
