package com.altis.erp.registry.application;

import com.altis.erp.registry.api.CepLookupResponse;
import com.altis.erp.registry.api.CnpjLookupResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class RegistryLookupService {

    private final RestClient restClient = RestClient.builder().build();

    public CepLookupResponse lookupCep(String zipCode) {
        String normalized = zipCode.replaceAll("\\D", "");

        if (normalized.length() != 8) {
            throw new RuntimeException("CEP inválido");
        }

        Map<?, ?> response = restClient.get()
                .uri("https://viacep.com.br/ws/{cep}/json/", normalized)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw new RuntimeException("Erro ao consultar CEP");
                })
                .body(Map.class);

        if (response == null || Boolean.TRUE.equals(response.get("erro"))) {
            throw new RuntimeException("CEP não encontrado");
        }

        return new CepLookupResponse(
                normalized,
                (String) response.get("logradouro"),
                (String) response.get("complemento"),
                (String) response.get("bairro"),
                (String) response.get("localidade"),
                (String) response.get("uf")
        );
    }

    public CnpjLookupResponse lookupCnpj(String cnpj) {
        String normalized = cnpj.replaceAll("\\D", "");

        if (normalized.length() != 14) {
            throw new RuntimeException("CNPJ inválido");
        }

        Map<?, ?> response = restClient.get()
                .uri("https://brasilapi.com.br/api/cnpj/v1/{cnpj}", normalized)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw new RuntimeException("Erro ao consultar CNPJ");
                })
                .body(Map.class);

        if (response == null) {
            throw new RuntimeException("CNPJ não encontrado");
        }

        return new CnpjLookupResponse(
                (String) response.get("razao_social"),
                (String) response.get("nome_fantasia"),
                normalized,
                onlyDigits((String) response.get("cep")),
                (String) response.get("logradouro"),
                (String) response.get("numero"),
                (String) response.get("complemento"),
                (String) response.get("bairro"),
                (String) response.get("municipio"),
                (String) response.get("uf")
        );
    }

    private String onlyDigits(String value) {
        if (value == null) {
            return null;
        }
        return value.replaceAll("\\D", "");
    }
}