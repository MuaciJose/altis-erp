package com.altis.erp.customer.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateCustomerRequest(

        @NotBlank
        String type,

        String status,

        @NotBlank
        @Size(max = 150)
        String name,

        String tradeName,

        @NotBlank
        String document,

        String secondaryDocument,

        LocalDate birthOrFoundationDate,

        @Email
        String email,

        String mobilePhone,
        String landlinePhone,

        String zipCode,
        String street,
        String number,
        String complement,
        String district,
        String city,
        String state,

        String profession,
        String companyName,

        String responsibleSeller,
        String notes,
        String tags
) {
}