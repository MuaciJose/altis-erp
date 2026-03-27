package com.altis.erp.registry.api;

public record CepLookupResponse(
        String zipCode,
        String street,
        String complement,
        String district,
        String city,
        String state
) {
}