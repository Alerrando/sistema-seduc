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

    public void create(Integer teacherId, List<Object[]> offices){
        for(Object[] office : offices) {
            Integer idOffice = (Integer) office[0];

            RegisterTeacher registerTeacher = registerTeacherRepository.getReferenceById(teacherId);
            RegisterOffice registerOffice = registerOfficeRepository.getReferenceById(idOffice);

            RegisterTeachersOffice registerTeachersOffice = new RegisterTeachersOffice(0, registerTeacher, registerOffice);

            teachersOfficeRepository.save(registerTeachersOffice);
        }

    }
}
