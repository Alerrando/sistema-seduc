package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.repository.UserRepository;
import com.gerenciamentoescolas.server.security.JWTTokenProvider;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAll(){
        List<User> result = userRepository.findAll();
        return result;
    }

    public ResponseEntity<Object> create(User user){
        User novoUsuario = userRepository.save(user);
        String token = JWTTokenProvider.createToken(novoUsuario);
        Map<String, Object> response = new HashMap<>();
        response.put("usuario", novoUsuario);
        response.put("token", token);

        return ResponseEntity.ok().body(response);
    }
}
