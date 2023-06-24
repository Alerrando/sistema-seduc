package com.gerenciamentoescolas.server.controllers;

import java.util.Date;
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
import com.gerenciamentoescolas.server.services.CadastroProfessorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/cadastro-professor")
public class CadastroProfessorControllers {
    @Autowired
    private CadastroProfessorService cadastroProfessorService;

    @GetMapping
    public List<CadastroProfessor> findAll(){
        List<CadastroProfessor> result = cadastroProfessorService.findAll();
        return result;
    }

    @GetMapping("/boletim/{professorId}&{dataInicial}&{dataFinal}")
    public List<CadastroProfessorDTO> findProfessorAulas(@PathVariable String professorId, @PathVariable Date dataInicial, @PathVariable Date dataFinal){
        List<CadastroProfessorDTO> result = cadastroProfessorService.findProfessorAulas(professorId, dataInicial, dataFinal);
        return result;
    }

    @PostMapping("{escolaId}")
    public CadastroProfessor create(@RequestBody CadastroProfessor cadastroProfessor, @PathVariable Integer escolaId){
        return cadastroProfessorService.create(cadastroProfessor, escolaId);
    }

    @PutMapping("/{escolaId}")
    public CadastroProfessor edit(@RequestBody CadastroProfessor cadastroProfessor, @PathVariable Integer escolaId){
        return cadastroProfessorService.edit(cadastroProfessor, escolaId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastroProfessorService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CadastroProfessor> findById(@PathVariable String id) {
        CadastroProfessor professor = cadastroProfessorService.findById(id);
        if (professor != null) {
            return ResponseEntity.ok(professor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
