package com.gerenciamentoescolas.server.services;

import java.util.*;

import com.gerenciamentoescolas.server.dto.CadastroProfessorDTO;
import com.gerenciamentoescolas.server.exception.ProfessorJaCadastradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import com.gerenciamentoescolas.server.repository.CadastroAulaRepository;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;
import com.gerenciamentoescolas.server.repository.CadastroProfessorRepository;

@Service
public class CadastroProfessorService {
    @Autowired
    private CadastroProfessorRepository cadastroProfessorRepository;

    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    @Autowired
    private CadastroAulaRepository cadastroAulaRepository;

    public List<CadastroProfessor> findAll(){
        List <CadastroProfessor> result = cadastroProfessorRepository.findAll();
        return result;
    }

    public List<CadastroProfessorDTO> findProfessorAulas(String professorId, Date dataInicial, Date dataFinal) {
        Integer idProfessorInteger = Integer.parseInt(professorId);
        List<Object[]> results = cadastroProfessorRepository.findProfessorAulas(idProfessorInteger, dataInicial, dataFinal);
        Map<Date, CadastroProfessorDTO> professoresMap = new HashMap<>();

        for (Object[] result : results) {
            Integer quantidadeAulas = (Integer) result[0];
            String name = (String) result[1];
            Date diaAula = (Date) result[2];
            String cadastroEscola = (String) result[3].toString();

            CadastroProfessorDTO professorDTO = professoresMap.get(diaAula);

            if (professorDTO == null) {
                professorDTO = new CadastroProfessorDTO(quantidadeAulas, name, diaAula, cadastroEscola);
                professoresMap.put(diaAula, professorDTO);
            }
        }

        return new ArrayList<>(professoresMap.values());
    }

    public CadastroProfessor create(CadastroProfessor cadastroProfessor, Integer escolaId){        
        if(cadastroProfessorRepository.existsByCpf(cadastroProfessor.getCpf())){
            throw new ProfessorJaCadastradoException("Professor já cadastrado!");
        }
        
        CadastroEscola escola = cadastroEscolaRepository.findById(escolaId).orElseThrow(() -> new RuntimeException("Escola não encontrada"));
        cadastroProfessor.setSede(escola.getId());

        return cadastroProfessorRepository.save(cadastroProfessor);
    }

    public CadastroProfessor edit(CadastroProfessor cadastroProfessor, Integer escolaId){
        CadastroEscola escola = cadastroEscolaRepository.findById(escolaId).orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        cadastroProfessor.setSede(escola.getId());
        return cadastroProfessorRepository.save(cadastroProfessor);
    }

    public void delete(Integer id){
        List<CadastroAulas> results = cadastroAulaRepository.filterById(id);
        
        for(CadastroAulas result : results){
            if(result.getCadastroProfessor() == id){
                cadastroAulaRepository.deleteById(result.getId());
            }
        }
        cadastroProfessorRepository.deleteById(id);
    }

    public CadastroProfessor findById(String id){
        Integer idProfessor = Integer.parseInt(id);
        return cadastroProfessorRepository.findById(idProfessor).orElse(null);
    }
}
