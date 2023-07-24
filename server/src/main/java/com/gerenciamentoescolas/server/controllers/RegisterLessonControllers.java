package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.RegisterLesson;
import com.gerenciamentoescolas.server.services.CadastroAulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/cadastro-aulas")
public class CadastroAulasControllers {
    @Autowired
    private CadastroAulaService cadastroAulaService;

    @GetMapping
    public List<RegisterLesson> findall(){
        List<RegisterLesson> result = cadastroAulaService.findAll();
        return result;
    }

    @GetMapping("/page")
    public Page<RegisterLesson> findPageable(@RequestParam int pageNumber, @RequestParam(defaultValue = "10") int pageSize){
        Page<RegisterLesson> result = cadastroAulaService.findAllPageable(pageNumber, pageSize);
        return result;
    }

    @GetMapping("/{name}")
    public List<RegisterLesson> findByCadastroProfessor(@PathVariable String name){
        List<RegisterLesson> aulas = cadastroAulaService.findByCadastroProfessor(name);
        return aulas;
    }

    @PostMapping("/{escolaId}&{professorId}")
    public RegisterLesson create(@PathVariable Integer escolaId, @PathVariable Integer professorId, @RequestBody RegisterLesson registerLesson) {
        return cadastroAulaService.create(registerLesson, escolaId, professorId);
    }

    @PutMapping("/{escolaId}&{professorId}")
    public RegisterLesson update(@PathVariable Integer escolaId, @PathVariable Integer professorId, @RequestBody RegisterLesson registerLesson){
        return cadastroAulaService.update(escolaId, professorId, registerLesson);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastroAulaService.delete(id);
    }
}
