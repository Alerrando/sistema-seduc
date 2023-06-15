package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.exception.EscolaJaCadastradaException;
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
        List<CadastroEscola> escolas = cadastroEscolaRepository.findAll();
        for(CadastroEscola escola : escolas){
            if(cadastroEscolaRepository.existsByName(cadastroEscola.getName())){
                throw new EscolaJaCadastradaException("Escola já cadastrada!");
            }
        }
        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public CadastroEscola edit(Integer id, CadastroEscola cadastroEscola){
        cadastroEscola.setId(id);
        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public void delete(Integer id){
        cadastroEscolaRepository.deleteById(id);
    }

    public CadastroEscola findById(Integer id) {
        return cadastroEscolaRepository.findById(id).orElse(null);
    }
}
