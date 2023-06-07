package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.services.CadastroEscolaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/cadastro-escola")
public class CadastroEscolaControllers {
    @Autowired
    private CadastroEscolaService cadastroEscolaService;

    @GetMapping
    public List<CadastroEscola> findAll(){
        List<CadastroEscola> result = cadastroEscolaService.findAll();
        return result;
    }

    @PostMapping
    public CadastroEscola create(@RequestBody CadastroEscola cadastroEscola){
        return cadastroEscolaService.create(cadastroEscola);
    }

    @PutMapping
    public CadastroEscola edit(@PathVariable Integer id, @RequestBody CadastroEscola cadastroEscola){
        return cadastroEscolaService.edit(id, cadastroEscola);
    }

    @DeleteMapping
    public void delete(@PathVariable Integer id){
        cadastroEscolaService.delete(id);
    }
}
