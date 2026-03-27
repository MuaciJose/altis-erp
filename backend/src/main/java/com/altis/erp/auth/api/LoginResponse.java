package com.altis.erp.auth.api;

public record LoginResponse(
        String accessToken,
        String tokenType
) {
}