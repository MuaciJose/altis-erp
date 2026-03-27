package com.altis.erp.registry.api;

public record CnpjLookupResponse(
        String legalName,
        String tradeName,
        String document,
        String zipCode,
        String street,
        String number,
        String complement,
        String district,
        String city,
        String state
) {
}