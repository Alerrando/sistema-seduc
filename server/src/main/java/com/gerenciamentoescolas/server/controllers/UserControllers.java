package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/users")
public class UserControllers {
    @Autowired
    UserService userService;

    @GetMapping
    public List<User> findAll(){
        List<User> result = userService.findAll();
        return result;
    }

    @GetMapping("/find")
    public User getUserByEmailPassword(@RequestBody String email, @RequestBody String password){
        return userService.getUserByEmailPassword(email, password);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody User user){
        return userService.create(user);
    }

}
