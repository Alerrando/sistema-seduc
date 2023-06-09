package com.gerenciamentoescolas.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.services.FreeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/free")
public class FreeControllers {
    @Autowired
    FreeService freeService;

    @GetMapping
    public String createToken(@RequestBody User user){
        return freeService.createToken(user);
    }
}
