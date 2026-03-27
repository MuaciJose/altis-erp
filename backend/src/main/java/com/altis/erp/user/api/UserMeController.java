package com.altis.erp.user.api;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserMeController {

    @GetMapping("/me")
    public Map<String, String> me(Authentication authentication) {
        return Map.of(
                "email", authentication.getName(),
                "status", "authenticated"
        );
    }
}