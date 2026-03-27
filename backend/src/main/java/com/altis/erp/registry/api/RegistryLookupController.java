package com.altis.erp.registry.api;

import com.altis.erp.registry.application.RegistryLookupService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/registry")
public class RegistryLookupController {

    private final RegistryLookupService service;

    public RegistryLookupController(RegistryLookupService service) {
        this.service = service;
    }

    @GetMapping("/cep/{zipCode}")
    public CepLookupResponse lookupCep(@PathVariable String zipCode) {
        return service.lookupCep(zipCode);
    }

    @GetMapping("/cnpj/{cnpj}")
    public CnpjLookupResponse lookupCnpj(@PathVariable String cnpj) {
        return service.lookupCnpj(cnpj);
    }
}