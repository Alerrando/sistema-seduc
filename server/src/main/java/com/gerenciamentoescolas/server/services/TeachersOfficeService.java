package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.TeachersOffice;
import com.gerenciamentoescolas.server.repository.TeachersOfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeachersOfficeService {
    @Autowired
    private TeachersOfficeRepository teachersOfficeRepository;

    public List<TeachersOffice> findAll(){
        return teachersOfficeRepository.findAll();
    }

    public TeachersOffice create(TeachersOffice teachersOffice){
        return teachersOfficeRepository.save(teachersOffice);
    }
}
