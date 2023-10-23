package com.gerenciamentoescolas.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gerenciamentoescolas.server.services.FreeService;

@CrossOrigin(origins = { "http://192.168.0.78:3000", "http://www3.rancharia.sp.gov.br"})
@RestController
@RequestMapping(value = "/free")
public class FreeControllers {
    @Autowired
    FreeService freeService;

    @GetMapping
    public String createToken(){
        return freeService.createToken();
    }
}