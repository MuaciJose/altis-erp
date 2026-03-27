package com.altis.erp.customer.infrastructure;

import com.altis.erp.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByTenantIdOrderByNameAsc(Long tenantId);

    boolean existsByTenantIdAndDocument(Long tenantId, String document);
}