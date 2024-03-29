package com.gerenciamentoescolas.server.services;

import java.util.*;

import com.gerenciamentoescolas.server.entities.BulletinTeacher;
import com.gerenciamentoescolas.server.entities.LessonKey;
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
        Map<LessonKey, BulletinTeacher> professoresMap = new HashMap<>();
        Integer amountTimeTotalAux = 0;

        for (Object[] result : results) {
            Integer amountTime = (Integer) result[0];
            String name = (String) result[1];
            Date lessonDay = (Date) result[2];
            RegisterSchool registerSchool = (RegisterSchool) result[3];
            Long amountTimeTotal = Long.valueOf("0");

            LessonKey lessonKey = new LessonKey(lessonDay, registerSchool.getId());
            BulletinTeacher professorDTO = professoresMap.get(lessonKey);

            if(result[4] != null)
                amountTimeTotal = (Long) result[4];

            if (professorDTO == null) {
                amountTimeTotalAux = amountTimeTotalAux + amountTimeTotal.intValue();
                professorDTO = new BulletinTeacher(amountTime, name, lessonDay, registerSchool, amountTimeTotalAux);
                professoresMap.put(lessonKey, professorDTO);
            }
        }

        return new ArrayList<>(professoresMap.values());
    }

    public RegisterTeacher create(RegisterTeacher registerTeacher){
        if(registerTeacherRepository.existsByCpf(registerTeacher.getCpf())){
            throw new TeacherAlreadyRegistered("Professor já cadastrado!");
        }

        return registerTeacherRepository.save(registerTeacher);
    }

    public RegisterTeacher edit(RegisterTeacher registerTeacher){
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
