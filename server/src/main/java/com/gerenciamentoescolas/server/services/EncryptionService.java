package com.gerenciamentoescolas.server.services;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gerenciamentoescolas.server.entities.User;

@Service
public class EncryptionService {    
    public String encryptorData(User user) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);

        BasicTextEncryptor encryptor = new BasicTextEncryptor();
        encryptor.setPassword("suaChaveDeCriptografia");

        return encryptor.encrypt(userJson);
    }
}
