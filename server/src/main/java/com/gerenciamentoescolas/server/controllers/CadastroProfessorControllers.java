package com.gerenciamentoescolas.server.controllers;

import java.util.List;

import com.gerenciamentoescolas.server.dto.CadastroProfessorDTO;
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

import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import com.gerenciamentoescolas.server.services.CadastorProfessorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/cadastro-professor")
public class CadastroProfessorControllers {
    @Autowired
    private CadastorProfessorService cadastorProfessorService;

    @GetMapping
    public List<CadastroProfessor> findAll(){
        List<CadastroProfessor> result = cadastorProfessorService.findAll();
        return result;
    }

    @GetMapping("/relatorio")
    public List<CadastroProfessorDTO> findProfessorAulas(){
        List<CadastroProfessorDTO> result = cadastorProfessorService.findProfessorAulas();
        return result;
    }

    @PostMapping
    public CadastroProfessor create(@RequestBody CadastroProfessor cadastroProfessor){
        return cadastorProfessorService.create(cadastroProfessor);
    }

    @PutMapping("/{id}")
    public CadastroProfessor edit(@RequestBody CadastroProfessor cadastroProfessor, @PathVariable Integer id){
        return cadastorProfessorService.edit(cadastroProfessor, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastorProfessorService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CadastroProfessor> findById(@PathVariable Integer id) {
        CadastroProfessor escola = cadastorProfessorService.findById(id);
        if (escola != null) {
            return ResponseEntity.ok(escola);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
