package com.altis.erp.customer.application;

import com.altis.erp.customer.domain.Customer;
import com.altis.erp.customer.infrastructure.CustomerRepository;
import com.altis.erp.tenant.TenantContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> list() {
        return repository.findByTenantId(TenantContext.getTenantId());
    }

    public Customer create(Customer customer) {
        customer.setTenantId(TenantContext.getTenantId());
        return repository.save(customer);
    }
}