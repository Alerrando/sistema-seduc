package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.repository.CadastroAulaRepository;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CadastroAulaService {
    @Autowired
    private CadastroAulaRepository cadastroAulaRepository;

    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    public List<CadastroAulas> findAll(){
        List<CadastroAulas> result = cadastroAulaRepository.findAll();
        return result;
    }

    public CadastroAulas create(CadastroAulas cadastroAulas, Integer escolaId) {
        CadastroEscola escola = cadastroEscolaRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        cadastroAulas.setDiaAula(new Date());
        cadastroAulas.setCadastroEscola(escola.getId());

        return cadastroAulaRepository.save(cadastroAulas);
    }

    public CadastroAulas update(Integer id ,CadastroAulas cadastroAulas){
        cadastroAulas.setId(id);
        return cadastroAulaRepository.save(cadastroAulas);
    }

    public void delete(Integer id){
        cadastroAulaRepository.deleteById(id);
    }

}
