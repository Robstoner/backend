package com.test.realworldexample.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.test.realworldexample.config.JwtService;
import com.test.realworldexample.exceptions.ItemNotFoundException;
import com.test.realworldexample.user.Role;
import com.test.realworldexample.user.User;
import com.test.realworldexample.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements AuthenticationServiceI {

	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private final TokenRepository tokenRepository;
	@Autowired
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private final JwtService jwtService;
	@Autowired
	private final AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {
		User user = User.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.email(request.getEmail())
				.roles(new Role[] { Role.USER })
				.password(passwordEncoder.encode(request.getPassword()))
				.build();

		userRepository.save(user);
		String jwtToken = jwtService.generateToken(user);

		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

	public AuthenticationResponse login(LoginRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()));

		UserDetails user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new ItemNotFoundException("User not found"));

		String jwtToken = jwtService.generateToken(user);

		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

	// public AuthenticationResponse oauth2Login() {
		
	// }

	public void logout(String token) {
		Token tokenObj = tokenRepository.findById(token)
				.orElseThrow(() -> new ItemNotFoundException("Token not found"));

		tokenObj.setExpired(true);
		tokenRepository.save(tokenObj);
	}
}
