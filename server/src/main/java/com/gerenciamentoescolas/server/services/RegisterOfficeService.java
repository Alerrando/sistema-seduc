package com.gerenciamentoescolas.server.services;

import java.util.List;

import com.gerenciamentoescolas.server.exception.RegisterOfficeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.RegisterOffice;
import com.gerenciamentoescolas.server.repository.RegisterOfficeRepository;

@Service
public class RegisterOfficeService {
    @Autowired
    private RegisterOfficeRepository registerOfficeRepository;

    public List<RegisterOffice> findAll(){
        return registerOfficeRepository.findAll();
    }

    public RegisterOffice findById(Integer id){ return registerOfficeRepository.findById(id).orElse(null); }

    public RegisterOffice create(RegisterOffice registerOffice){
        if(registerOfficeRepository.existsByName(registerOffice.getName())){
            throw new RegisterOfficeException("Cargo já cadastrado!");
        }

        return registerOfficeRepository.save(registerOffice);
    }

    public RegisterOffice edit(Integer id, RegisterOffice registerOffice){
        RegisterOffice registerOfficeEdit = registerOfficeRepository.findById(id).orElseThrow(() -> new RuntimeException("Cargo não encontrado"));
        registerOffice.setId(registerOfficeEdit.getId());

        return registerOfficeRepository.save(registerOffice);
    }

    public void delete(Integer id){
        registerOfficeRepository.deleteById(id);
    }
}
