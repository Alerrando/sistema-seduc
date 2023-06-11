package com.gerenciamentoescolas.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import com.gerenciamentoescolas.server.repository.CadastroProfessorRepository;

@Service
public class CadastorProfessorService {
    @Autowired
    private CadastroProfessorRepository cadastroProfessorRepository;

    public List<CadastroProfessor> findAll(){
        List <CadastroProfessor> result = cadastroProfessorRepository.findAll();
        return result;
    }

    public CadastroProfessor create(CadastroProfessor cadastroProfessor){
        return cadastroProfessorRepository.save(cadastroProfessor);
    }

    public CadastroProfessor edit(CadastroProfessor cadastroProfessor, Integer id){
        cadastroProfessor.setId(id);
        return cadastroProfessorRepository.save(cadastroProfessor);
    }

    public void delete(Integer id){
        cadastroProfessorRepository.deleteById(id);
    }

    public CadastroProfessor findById(Integer id){
        return cadastroProfessorRepository.findById(id).orElse(null);
    }
}
