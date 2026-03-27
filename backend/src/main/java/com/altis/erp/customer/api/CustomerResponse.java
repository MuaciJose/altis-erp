package com.altis.erp.customer.api;

public record CustomerResponse(
        Long id,
        String type,
        String status,
        String name,
        String tradeName,
        String document,
        String email,
        String city,
        String state
) {
}