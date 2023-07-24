package com.gerenciamentoescolas.server.controllers;

import java.util.Date;
import java.util.List;

import com.gerenciamentoescolas.server.dto.RegisterTeacherDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import com.gerenciamentoescolas.server.services.RegisterTeacherService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/cadastro-professor")
public class RegisterTeacherControllers {
    @Autowired
    private RegisterTeacherService registerTeacherService;

    @GetMapping
    public List<RegisterTeacher> findAll(){
        List<RegisterTeacher> result = registerTeacherService.findAll();
        return result;
    }

    @GetMapping("/boletim/{professorId}&{dataInicial}&{dataFinal}")
    public List<RegisterTeacherDTO> findProfessorAulas(@PathVariable String professorId, @PathVariable Date dataInicial, @PathVariable Date dataFinal){
        List<RegisterTeacherDTO> result = registerTeacherService.findProfessorAulas(professorId, dataInicial, dataFinal);
        return result;
    }

    @PostMapping("/{escolaId}")
    public void create(@RequestBody RegisterTeacher registerTeacher, @PathVariable Integer escolaId){
        registerTeacherService.create(registerTeacher, escolaId);
    }

    @PutMapping("/{escolaId}")
    public RegisterTeacher edit(@RequestBody RegisterTeacher registerTeacher, @PathVariable Integer escolaId){
        return registerTeacherService.edit(registerTeacher, escolaId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        registerTeacherService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisterTeacher> findById(@PathVariable String id) {
        RegisterTeacher professor = registerTeacherService.findById(id);
        if (professor != null) {
            return ResponseEntity.ok(professor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
