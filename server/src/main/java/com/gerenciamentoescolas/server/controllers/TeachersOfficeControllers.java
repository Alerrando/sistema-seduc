package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.TeachersOffice;
import com.gerenciamentoescolas.server.services.TeachersOfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(name = "/security/teachers-office")
public class TeachersOfficeControllers {
    @Autowired
    private TeachersOfficeService teachersOfficeService;

    @GetMapping
    public List<TeachersOffice> findAll(){
        return teachersOfficeService.findAll();
    }

    @PostMapping
    public TeachersOffice create(@PathVariable TeachersOffice teachersOffice){
        return teachersOfficeService.create(teachersOffice);
    }
}
