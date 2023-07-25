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

    public List<User> getUserByMandatoryBulletin(){
        List<User> users = userRepository.findByMandatoryBulletin();

        return users;
    }

    public User getUserBySchoolId(Integer schoolId){
        User user = userRepository.findUserBySchoolId(schoolId);

        return user;
    }


    public ResponseEntity<Object> create(User user){
        User userSchool = userRepository.findUserBySchoolId(user.getRegisterSchool().getId());

        if(userRepository.existsByRg(user.getRg())){
            throw  new UserJaCadastradoException("Usuário já cadastrado!");
        }
        
        if(userSchool.getRegisterSchool().getId().equals(user.getRegisterSchool().getId())){
            throw new UserJaCadastradoException("Essa escola já está associada a um usuário");
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
