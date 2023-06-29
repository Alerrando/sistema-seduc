package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.dto.CadastroEscolaDTO;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.services.CadastroEscolaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/cadastro-escola")
public class CadastroEscolaControllers {
    @Autowired
    private CadastroEscolaService cadastroEscolaService;

    @GetMapping
    public List<CadastroEscola> findAll(){
        List<CadastroEscola> result = cadastroEscolaService.findAll();
        return result;
    }

    @GetMapping("/relatorio")
    public List<CadastroEscolaDTO> findEscolasAulas(){
        List<CadastroEscolaDTO> result = cadastroEscolaService.findEscolasAulas();
        return result;
    }

    @PostMapping
    public CadastroEscola create(@RequestBody CadastroEscola cadastroEscola){
        return cadastroEscolaService.create(cadastroEscola);
    }

    @PutMapping("/{id}")
    public CadastroEscola edit(@PathVariable Integer id, @RequestBody CadastroEscola cadastroEscola){
        return cadastroEscolaService.edit(id, cadastroEscola);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        cadastroEscolaService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CadastroEscola> findById(@PathVariable Integer id) {
        CadastroEscola escola = cadastroEscolaService.findById(id);
        if (escola != null) {
            return ResponseEntity.ok(escola);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
