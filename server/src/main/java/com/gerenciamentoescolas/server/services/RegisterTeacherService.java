package com.gerenciamentoescolas.server.services;

import java.util.*;

import com.gerenciamentoescolas.server.entities.BulletinTeacher;
import com.gerenciamentoescolas.server.exception.TeacherAlreadyRegistered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import com.gerenciamentoescolas.server.repository.RegisterSchoolRepository;
import com.gerenciamentoescolas.server.repository.RegisterTeacherRepository;

@Service
public class RegisterTeacherService {
    @Autowired
    private RegisterTeacherRepository registerTeacherRepository;

    @Autowired
    private RegisterSchoolRepository registerSchoolRepository;

    public List<RegisterTeacher> findAll(){
        List <RegisterTeacher> result = registerTeacherRepository.findAll();
        return result;
    }

    public List<BulletinTeacher> findProfessorAulas(String professorId, Date dataInicial, Date dataFinal) {
        Integer idProfessorInteger = Integer.parseInt(professorId);
        List<Object[]> results = registerTeacherRepository.findProfessorAulas(idProfessorInteger, dataInicial, dataFinal);
        Map<Date, BulletinTeacher> professoresMap = new HashMap<>();

        for (Object[] result : results) {
            Integer amountTime = (Integer) result[0];
            String name = (String) result[1];
            Date lessonDay = (Date) result[2];
            RegisterSchool registerSchool = (RegisterSchool) result[3];

            BulletinTeacher professorDTO = professoresMap.get(lessonDay);

            if (professorDTO == null) {
                professorDTO = new BulletinTeacher(amountTime, name, lessonDay, registerSchool);
                professoresMap.put(lessonDay, professorDTO);
            }
        }

        return new ArrayList<>(professoresMap.values());
    }

    public void create(RegisterTeacher registerTeacher, Integer escolaId){
        if(registerTeacherRepository.existsByCpf(registerTeacher.getCpf())){
            throw new TeacherAlreadyRegistered("Professor já cadastrado!");
        }
        
        RegisterSchool school = registerSchoolRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        registerTeacher.setThirst(school);

        registerSchoolRepository.save(school);
        registerTeacherRepository.save(registerTeacher);
    }

    public RegisterTeacher edit(RegisterTeacher registerTeacher, Integer escolaId){
        RegisterSchool school = registerSchoolRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        registerTeacher.setThirst(school);
        return registerTeacherRepository.save(registerTeacher);
    }

    public void delete(Integer id){
        registerTeacherRepository.deleteById(id);
    }

    public RegisterTeacher findById(String id){
        Integer idProfessor = Integer.parseInt(id);
        return registerTeacherRepository.findById(idProfessor).orElse(null);
    }
}
