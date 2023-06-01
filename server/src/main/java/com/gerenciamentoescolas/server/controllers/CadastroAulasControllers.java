package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import com.gerenciamentoescolas.server.services.CadastroAulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public CadastroAulas create(@RequestBody CadastroAulas cadastroAulas){
        return cadastroAulaService.create(cadastroAulas);
    }

    @PutMapping("/{id}")
    public CadastroAulas update(@PathVariable Integer id, @RequestBody CadastroAulas cadastroAulas){
        return cadastroAulaService.update(id, cadastroAulas);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastroAulaService.delete(id);
    }
}
