package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.RegisterOffice;
import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import com.gerenciamentoescolas.server.repository.RegisterOfficeRepository;
import com.gerenciamentoescolas.server.repository.RegisterTeacherRepository;
import com.gerenciamentoescolas.server.repository.TeachersOfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterTeachersOfficeService {
    @Autowired
    private RegisterTeacherRepository registerTeacherRepository;
    @Autowired
    private RegisterOfficeRepository registerOfficeRepository;
    @Autowired
    private TeachersOfficeRepository teachersOfficeRepository;

    public List<RegisterTeachersOffice> findAll(){
        return teachersOfficeRepository.findAll();
    }

    public List<RegisterTeachersOffice> findById(Integer teacherId){
        return teachersOfficeRepository.findByTeacherId(teacherId);
    }

    public void create(Integer teacherId, List<Integer> offices){
        for(Integer office : offices) {
            RegisterTeacher registerTeacher = registerTeacherRepository.getReferenceById(teacherId);
            RegisterOffice registerOffice = registerOfficeRepository.getReferenceById(office);

            RegisterTeachersOffice registerTeachersOffice = new RegisterTeachersOffice(0, registerTeacher, registerOffice);

            teachersOfficeRepository.save(registerTeachersOffice);
        }

    }
}
