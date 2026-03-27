package com.altis.erp.customer.application;

import com.altis.erp.customer.api.CreateCustomerRequest;
import com.altis.erp.customer.api.CustomerResponse;
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

    public List<CustomerResponse> list() {
        Long tenantId = TenantContext.getTenantId();

        return repository.findByTenantIdOrderByNameAsc(tenantId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CustomerResponse create(CreateCustomerRequest request) {
        Long tenantId = TenantContext.getTenantId();

        String document = normalize(request.document());

        if (repository.existsByTenantIdAndDocument(tenantId, document)) {
            throw new RuntimeException("Documento já cadastrado");
        }

        Customer c = new Customer();

        c.setTenantId(tenantId);
        c.setType(request.type());
        c.setStatus(defaultIfNull(request.status(), "ACTIVE"));
        c.setName(request.name());
        c.setTradeName(request.tradeName());
        c.setDocument(document);
        c.setSecondaryDocument(request.secondaryDocument());
        c.setBirthOrFoundationDate(request.birthOrFoundationDate());
        c.setEmail(request.email());
        c.setMobilePhone(request.mobilePhone());
        c.setLandlinePhone(request.landlinePhone());
        c.setZipCode(normalize(request.zipCode()));
        c.setStreet(request.street());
        c.setNumber(request.number());
        c.setComplement(request.complement());
        c.setDistrict(request.district());
        c.setCity(request.city());
        c.setState(request.state());
        c.setProfession(request.profession());
        c.setCompanyName(request.companyName());
        c.setResponsibleSeller(request.responsibleSeller());
        c.setNotes(request.notes());
        c.setTags(request.tags());

        validate(c);

        return toResponse(repository.save(c));
    }

    private void validate(Customer c) {
        if (!"PF".equals(c.getType()) && !"PJ".equals(c.getType())) {
            throw new RuntimeException("Tipo inválido");
        }

        if ("PF".equals(c.getType()) && c.getDocument().length() != 11) {
            throw new RuntimeException("CPF inválido");
        }

        if ("PJ".equals(c.getType()) && c.getDocument().length() != 14) {
            throw new RuntimeException("CNPJ inválido");
        }
    }

    private String normalize(String v) {
        return v == null ? null : v.replaceAll("\\D", "");
    }

    private String defaultIfNull(String v, String def) {
        return (v == null || v.isBlank()) ? def : v;
    }

    private CustomerResponse toResponse(Customer c) {
        return new CustomerResponse(
                c.getId(),
                c.getType(),
                c.getStatus(),
                c.getName(),
                c.getTradeName(),
                c.getDocument(),
                c.getEmail(),
                c.getCity(),
                c.getState()
        );
    }
}