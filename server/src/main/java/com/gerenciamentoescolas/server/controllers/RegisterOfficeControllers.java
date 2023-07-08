package com.gerenciamentoescolas.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gerenciamentoescolas.server.entities.RegisterOffice;
import com.gerenciamentoescolas.server.services.RegisterOfficeService;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(value = "/security/office")
public class RegisterOfficeControllers {
    @Autowired
    RegisterOfficeService registerOfficeService;

    @GetMapping
    public List<RegisterOffice> findAll(){
        return registerOfficeService.findAll();
    }
}
