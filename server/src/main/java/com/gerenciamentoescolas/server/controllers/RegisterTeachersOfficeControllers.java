package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import com.gerenciamentoescolas.server.services.RegisterTeachersOfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(name = "/security/teachers-office")
public class RegisterTeachersOfficeControllers {
    @Autowired
    private RegisterTeachersOfficeService registerTeachersOfficeService;

    @GetMapping
    public List<RegisterTeachersOffice> findAll(){
        return registerTeachersOfficeService.findAll();
    }

    @PostMapping("{teacherId}")
    public void create(@PathVariable Integer teacherId, @RequestBody List<Object[]> offices){
        registerTeachersOfficeService.create(teacherId, offices);
    }
}
