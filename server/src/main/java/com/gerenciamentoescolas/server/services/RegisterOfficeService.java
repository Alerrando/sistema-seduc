package com.gerenciamentoescolas.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.RegisterOffice;
import com.gerenciamentoescolas.server.repository.RegisterOfficeRepository;

@Service
public class RegisterOfficeService {
    @Autowired
    RegisterOfficeRepository registerOfficeRepository;

    public List<RegisterOffice> findAll(){
        return registerOfficeRepository.findAll();
    }
}
