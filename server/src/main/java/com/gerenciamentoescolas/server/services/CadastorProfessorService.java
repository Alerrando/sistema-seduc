package com.gerenciamentoescolas.server.services;

import java.util.*;

import com.gerenciamentoescolas.server.dto.CadastroProfessorDTO;
import com.gerenciamentoescolas.server.exception.ProfessorJaCadastradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;
import com.gerenciamentoescolas.server.repository.CadastroProfessorRepository;

@Service
public class CadastorProfessorService {
    @Autowired
    private CadastroProfessorRepository cadastroProfessorRepository;

    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    public List<CadastroProfessor> findAll(){
        List <CadastroProfessor> result = cadastroProfessorRepository.findAll();
        return result;
    }

    public List<CadastroProfessorDTO> findProfessorAulas(String professorId, Date dataInicial, Date dataFinal) {
        List<Object[]> results = cadastroProfessorRepository.findProfessorAulas(professorId, dataInicial, dataFinal);
        Map<Integer, CadastroProfessorDTO> professoresMap = new HashMap<>();

        for (Object[] result : results) {
            Integer id = (Integer) result[0];
            String name = (String) result[1];
            Date diaAula = (Date) result[2];
            Long quantidadeAulas = (Long) result[3];
            String cadastroEscola = (String) result[4];

            CadastroProfessorDTO professorDTO = professoresMap.get(id);

            if (professorDTO == null) {
                professorDTO = new CadastroProfessorDTO(id.longValue(), name, quantidadeAulas, new ArrayList<>(), cadastroEscola);
                professoresMap.put(id, professorDTO);
            } else {
                professorDTO.setHoraAulas(professorDTO.getHoraAulas() + quantidadeAulas);
            }

            professorDTO.getDatasAulas().add(diaAula);
        }

        return new ArrayList<>(professoresMap.values());
    }

    public CadastroProfessor create(CadastroProfessor cadastroProfessor, Integer escolaId){
        List<CadastroProfessor> professores = cadastroProfessorRepository.findAll();
        for(CadastroProfessor professor : professores){
            if(cadastroProfessorRepository.existsByCpf(cadastroProfessor.getCpf())){
                throw new ProfessorJaCadastradoException("Professor já cadastrado!");
            }
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
        cadastroProfessorRepository.deleteById(id);
    }

    public CadastroProfessor findById(Integer id){
        return cadastroProfessorRepository.findById(id).orElse(null);
    }
}
