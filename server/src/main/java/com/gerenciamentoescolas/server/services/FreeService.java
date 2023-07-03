package com.gerenciamentoescolas.server.services;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.security.JWTTokenProvider;

@Service
public class FreeService {
    public String createToken(){
        User user = new User();
        String token = JWTTokenProvider.createToken(user);

        return token;
    }
}
