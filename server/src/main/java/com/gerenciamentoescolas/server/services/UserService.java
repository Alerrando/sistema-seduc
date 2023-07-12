package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.exception.UserJaCadastradoException;
import com.gerenciamentoescolas.server.repository.UserRepository;
import com.gerenciamentoescolas.server.security.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionService encryptedService;

    public List<User> findAll(){
        List<User> result = userRepository.findAll();
        return result;
    }

    public ResponseEntity<Object> getUserByEmailPassword(String email, String password){
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        Map<String, Object> response = new HashMap<>();

        response.put("usuario", user.get());

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

    public User ediUser(User user, Integer id){
        User userEdit = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        user.setId(userEdit.getId());

        return userRepository.save(user);
    }

    public void delete(Integer id){
        userRepository.deleteById(id);
    }
}
