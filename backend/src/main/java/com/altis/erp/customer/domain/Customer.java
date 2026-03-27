package com.altis.erp.customer.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(nullable = false, length = 2)
    private String type; // PF / PJ

    @Column(nullable = false, length = 20)
    private String status; // ACTIVE / INACTIVE

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "trade_name", length = 150)
    private String tradeName;

    @Column(nullable = false, length = 20)
    private String document;

    @Column(name = "secondary_document", length = 30)
    private String secondaryDocument;

    @Column(name = "birth_or_foundation_date")
    private LocalDate birthOrFoundationDate;

    @Column(length = 150)
    private String email;

    @Column(name = "mobile_phone", length = 30)
    private String mobilePhone;

    @Column(name = "landline_phone", length = 30)
    private String landlinePhone;

    @Column(name = "zip_code", length = 8)
    private String zipCode;

    @Column(length = 150)
    private String street;

    @Column(length = 20)
    private String number;

    @Column(length = 100)
    private String complement;

    @Column(name = "district", length = 100)
    private String district;

    @Column(length = 100)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(length = 100)
    private String profession;

    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "responsible_seller", length = 150)
    private String responsibleSeller;

    @Column(columnDefinition = "text")
    private String notes;

    @Column(length = 255)
    private String tags;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}