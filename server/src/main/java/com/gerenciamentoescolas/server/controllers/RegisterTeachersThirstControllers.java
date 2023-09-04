package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.RegisterTeachersThirst;
import com.gerenciamentoescolas.server.services.RegisterTeachersThirstService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/teachers-thirst")
public class RegisterTeachersThirstControllers {
    @Autowired
    public RegisterTeachersThirstService registerTeachersThirstService;

    @GetMapping
    public List<RegisterTeachersThirst> findAll(){
        return registerTeachersThirstService.findAll();
    }

    @GetMapping("/{idTeacher}")
    public List<RegisterTeachersThirst> findById(@PathVariable Integer idTeacher){
        return registerTeachersThirstService.findById(idTeacher);
    }

    @PostMapping("/{idTeacher}")
    public void create(@PathVariable Integer idTeacher, @RequestBody List<Integer> thirsts){
        registerTeachersThirstService.create(idTeacher, thirsts);
    }

    @PutMapping("/{idTeacher}")
    public void edit(@PathVariable Integer idTeacher, @RequestBody List<Integer> thirsts){
        registerTeachersThirstService.edit(idTeacher, thirsts);
    }
}
