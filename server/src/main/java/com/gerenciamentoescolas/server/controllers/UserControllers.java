package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/users")
public class UserControllers {
    @Autowired
    UserService userService;

    @GetMapping
    public List<User> findAll(){
        List<User> result = userService.findAll();
        return result;
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody User user){
        return userService.create(user);
    }
}
