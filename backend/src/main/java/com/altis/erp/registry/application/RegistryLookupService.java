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
        String normalized = onlyDigits(zipCode);

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
                value(response.get("logradouro")),
                value(response.get("complemento")),
                value(response.get("bairro")),
                value(response.get("localidade")),
                value(response.get("uf"))
        );
    }

    public CnpjLookupResponse lookupCnpj(String cnpj) {
        String normalized = onlyDigits(cnpj);

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
                value(response.get("razao_social")),
                value(response.get("nome_fantasia")),
                normalized,
                onlyDigits(value(response.get("cep"))),
                value(response.get("logradouro")),
                value(response.get("numero")),
                value(response.get("complemento")),
                value(response.get("bairro")),
                value(response.get("municipio")),
                value(response.get("uf"))
        );
    }

    private String onlyDigits(String value) {
        if (value == null) {
            return null;
        }
        return value.replaceAll("\\D", "");
    }

    private String value(Object value) {
        return value == null ? null : String.valueOf(value);
    }
}