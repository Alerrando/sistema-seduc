package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.exception.UserJaCadastradoException;
import com.gerenciamentoescolas.server.repository.UserRepository;
import com.gerenciamentoescolas.server.security.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    EncryptionService encryptedService;

    public List<User> findAll(){
        List<User> result = userRepository.findAll();
        return result;
    }

    public ResponseEntity<Object> getUserByEmailPassword(String email, String password){
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        String token = JWTTokenProvider.createToken(user.get());
        Map<String, Object> response = new HashMap<>();

        response.put("usuario", user.get());
        response.put("token", token);

        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<Object> create(User user){
        if(userRepository.existsByRg(user.getRg())){
            throw  new UserJaCadastradoException("Usuário já cadastrado!");
        }
        
        User novoUsuario = userRepository.save(user);
        String token = JWTTokenProvider.createToken(novoUsuario);

        return ResponseEntity.ok().body(token);
    }
}
