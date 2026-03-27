package com.altis.erp.tenant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/tenant")
public class TenantController {

    @GetMapping("/current")
    public Map<String, Object> currentTenant() {
        return Map.of(
                "tenantId", TenantContext.getTenantId()
        );
    }
}