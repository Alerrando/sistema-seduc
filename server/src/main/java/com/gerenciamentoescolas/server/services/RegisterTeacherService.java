package com.gerenciamentoescolas.server.services;

import java.util.*;

import com.gerenciamentoescolas.server.dto.CadastroProfessorDTO;
import com.gerenciamentoescolas.server.exception.TeacherAlreadyRegistered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.entities.RegisterTeacher;
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

    public List<RegisterTeacher> findAll(){
        List <RegisterTeacher> result = cadastroProfessorRepository.findAll();
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
            RegisterSchool registerSchool = (RegisterSchool) result[3];

            CadastroProfessorDTO professorDTO = professoresMap.get(diaAula);

            if (professorDTO == null) {
                professorDTO = new CadastroProfessorDTO(quantidadeAulas, name, diaAula, registerSchool);
                professoresMap.put(diaAula, professorDTO);
            }
        }

        return new ArrayList<>(professoresMap.values());
    }

    public void create(RegisterTeacher registerTeacher, Integer escolaId){
        if(cadastroProfessorRepository.existsByCpf(registerTeacher.getCpf())){
            throw new TeacherAlreadyRegistered("Professor já cadastrado!");
        }
        
        RegisterSchool escola = cadastroEscolaRepository.findById(escolaId).orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        registerTeacher.setSede(escola);

        cadastroEscolaRepository.save(escola);
        cadastroProfessorRepository.save(registerTeacher);
    }

    public RegisterTeacher edit(RegisterTeacher registerTeacher, Integer escolaId){
        RegisterSchool escola = cadastroEscolaRepository.findById(escolaId).orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        registerTeacher.setSede(escola);
        return cadastroProfessorRepository.save(registerTeacher);
    }

    public void delete(Integer id){
        cadastroProfessorRepository.deleteById(id);
    }

    public RegisterTeacher findById(String id){
        Integer idProfessor = Integer.parseInt(id);
        return cadastroProfessorRepository.findById(idProfessor).orElse(null);
    }
}
