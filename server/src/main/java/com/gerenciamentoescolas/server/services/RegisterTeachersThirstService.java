package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import com.gerenciamentoescolas.server.entities.RegisterTeachersThirst;
import com.gerenciamentoescolas.server.repository.RegisterSchoolRepository;
import com.gerenciamentoescolas.server.repository.RegisterTeacherRepository;
import com.gerenciamentoescolas.server.repository.RegisterTeachersThirstRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterTeachersThirstService {
    @Autowired
    private RegisterTeachersThirstRepository registerTeachersThirstRepository;
    @Autowired
    private RegisterTeacherRepository registerTeacherRepository;
    @Autowired
    private RegisterSchoolRepository registerSchoolRepository;

    public List<RegisterTeachersThirst> findAll(){
        return  registerTeachersThirstRepository.findAll();
    }

    public  List<RegisterTeachersThirst> findById(Integer idTeacher){
        return registerTeachersThirstRepository.findByIdTeacher(idTeacher);
    }

    public void create(Integer idTeacher, List<Integer> thirsts){
        RegisterTeacher registerTeacher = registerTeacherRepository.getReferenceById(idTeacher);
        for (Integer thirst : thirsts){
            RegisterSchool registerSchool = registerSchoolRepository.getReferenceById(thirst);

            RegisterTeachersThirst registerTeachersThirst = new RegisterTeachersThirst(0, registerTeacher, registerSchool);

            registerTeachersThirstRepository.save(registerTeachersThirst);
        }
    }

    public void edit(Integer teacherId, List<Integer> thirsts){
        registerTeachersThirstRepository.deleteByIdTeacher(teacherId);
        this.create(teacherId, thirsts);
    }
}
