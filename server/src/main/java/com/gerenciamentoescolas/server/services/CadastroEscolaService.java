package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CadastroEscolaService {
    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    public List<CadastroEscola> findAll(){
        List<CadastroEscola> result = cadastroEscolaRepository.findAll();
        return result;
    }

    public CadastroEscola create(CadastroEscola cadastroEscola){
        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public CadastroEscola edit(Integer id, CadastroEscola cadastroEscola){
        cadastroEscola.setId(id);
        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public void delete(Integer id){
        cadastroEscolaRepository.deleteById(id);
    }
}
