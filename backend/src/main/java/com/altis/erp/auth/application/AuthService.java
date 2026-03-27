package com.altis.erp.auth.application;

import com.altis.erp.auth.api.LoginRequest;
import com.altis.erp.auth.api.LoginResponse;
import com.altis.erp.config.security.JwtService;
import com.altis.erp.user.domain.User;
import com.altis.erp.user.infrastructure.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new RuntimeException("Usuário inativo");
        }

        boolean passwordMatches = passwordEncoder.matches(request.password(), user.getPasswordHash());
        if (!passwordMatches) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getTenantId());

        return new LoginResponse(token, "Bearer");
    }
}