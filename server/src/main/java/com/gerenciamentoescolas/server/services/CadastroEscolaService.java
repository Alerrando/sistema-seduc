package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.dto.CadastroEscolaDTO;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.exception.EscolaJaCadastradaException;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CadastroEscolaService {
    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    public List<CadastroEscola> findAll(){
        List<CadastroEscola> result = cadastroEscolaRepository.findAll();
        return result;
    }

    public List<CadastroEscolaDTO> findEscolasAulas() {
        List<Object[]> results = cadastroEscolaRepository.findEscolasAulas();
        List<CadastroEscolaDTO> escolasAulas = new ArrayList<>();
        for (Object[] result : results) {
            Integer id = (Integer) result[0];
            String name = (String) result[1];
            Long quantidadeAulas = Long.valueOf("0");
            if(result[2] != null){
                quantidadeAulas = (Long) result[2];
            }
            CadastroEscolaDTO escolaAula = new CadastroEscolaDTO(id, name, quantidadeAulas.intValue());
            escolasAulas.add(escolaAula);
        }
        return escolasAulas;
    }

    public CadastroEscola create(CadastroEscola cadastroEscola){
        if(cadastroEscolaRepository.existsByName(cadastroEscola.getName())){
            throw new EscolaJaCadastradaException("Escola já cadastrada!");
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
