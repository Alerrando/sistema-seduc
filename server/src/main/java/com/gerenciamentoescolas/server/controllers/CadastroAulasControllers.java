package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import com.gerenciamentoescolas.server.services.CadastroAulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/cadastro-aulas")
public class CadastroAulasControllers {
    @Autowired
    private CadastroAulaService cadastroAulaService;

    @GetMapping
    public List<CadastroAulas> findall(){
        List<CadastroAulas> result = cadastroAulaService.findAll();
        return result;
    }

    @GetMapping("/page")
    public Page<CadastroAulas> findPageable(@RequestParam int pageNumber, @RequestParam(defaultValue = "5") int pageSize){
        Page<CadastroAulas> result = cadastroAulaService.findAllPageable(pageNumber, pageSize);
        return result;
    }

    @GetMapping("/{name}")
    public List<CadastroAulas> findByCadastroProfessor(@PathVariable String name){
        List<CadastroAulas> aulas = cadastroAulaService.findByCadastroProfessor(name);
        return aulas;
    }

    @PostMapping("/{escolaId}&{professorId}")
    public CadastroAulas create(@RequestBody CadastroAulas cadastroAulas, @PathVariable Integer escolaId, @PathVariable Integer professorId) {
        return cadastroAulaService.create(cadastroAulas, escolaId, professorId);
    }

    @PutMapping("/{escolaId}&{professorId}")
    public CadastroAulas update(@PathVariable Integer escolaId, @PathVariable Integer professorId, @RequestBody CadastroAulas cadastroAulas){
        return cadastroAulaService.update(escolaId, professorId, cadastroAulas);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastroAulaService.delete(id);
    }
}
