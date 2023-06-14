package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import com.gerenciamentoescolas.server.repository.CadastroAulaRepository;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;

import com.gerenciamentoescolas.server.repository.CadastroProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CadastroAulaService {
    @Autowired
    private CadastroAulaRepository cadastroAulaRepository;

    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    @Autowired
    private CadastroProfessorRepository cadastroProfessorRepository;

    public List<CadastroAulas> findAll(){
        List<CadastroAulas> result = cadastroAulaRepository.findAll();
        return result;
    }
    public Page<CadastroAulas> findAllPageable(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<CadastroAulas> result = cadastroAulaRepository.findAll(pageable);
        return result;
    }

    public List<CadastroAulas> findByCadastroProfessor(Integer professorId){
        List<CadastroAulas> result = cadastroAulaRepository.findByCadastroProfessor(professorId);
        return result;
    }

    public CadastroAulas create(CadastroAulas cadastroAulas, Integer escolaId, Integer professorId) {
        CadastroEscola escola = cadastroEscolaRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
        CadastroProfessor professor = cadastroProfessorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        cadastroAulas.setDiaAula(new Date());
        cadastroAulas.setCadastroEscola(escola.getId());
        cadastroAulas.setCadastroProfessor(professor.getId());

        return cadastroAulaRepository.save(cadastroAulas);
    }

    public CadastroAulas update(Integer escolaId, Integer professorId ,CadastroAulas cadastroAulas){
        CadastroEscola escola = cadastroEscolaRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
        CadastroProfessor professor = cadastroProfessorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        cadastroAulas.setCadastroEscola(escola.getId());
        cadastroAulas.setCadastroProfessor(professor.getId());
        return cadastroAulaRepository.save(cadastroAulas);
    }

    public void delete(Integer id){
        cadastroAulaRepository.deleteById(id);
    }

}
