package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.BulletinSchool;
import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.exception.SchoolAlreadyRegistered;
import com.gerenciamentoescolas.server.repository.RegisterSchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RegisterSchoolService {
    @Autowired
    private RegisterSchoolRepository registerSchoolRepository;

    public List<RegisterSchool> findAll(){
        List<RegisterSchool> result = registerSchoolRepository.findAll();
        return result;
    }

    public RegisterSchool findById(Integer id) {
        return registerSchoolRepository.findById(id).orElse(null);
    }

    public List<BulletinSchool> findEscolasAulas(Integer schoolId, Date startDate, Date endDate) {
        List<Object[]> results = registerSchoolRepository.findEscolasAulas(schoolId, startDate, endDate);
        Map<Integer, BulletinSchool> escolasAulas = new HashMap<>();

        for (Object[] result : results) {
            Integer id = (Integer) result[0];
            String name = (String) result[1];
            Date lessonDay = (Date) result[2];
            Long amountTime = Long.valueOf("0");

            BulletinSchool bulletinSchool = escolasAulas.get(id);

            if (result[3] != null) {
                amountTime = (Long) result[3];
            }

            if (bulletinSchool == null) {
                bulletinSchool = new BulletinSchool(id, name, new ArrayList<Object[]>(), amountTime.intValue());
                bulletinSchool.getDatesWork().add(new Object[]{lessonDay, amountTime});
                escolasAulas.put(id, bulletinSchool);
            } else {
                if(bulletinSchool.getId() == id){
                    bulletinSchool.getDatesWork().add(new Object[]{lessonDay, amountTime});
                }
                bulletinSchool.setAmountTime(bulletinSchool.getAmountTime() + amountTime.intValue());
            }
        }

        return new ArrayList<>(escolasAulas.values());
    }

    public RegisterSchool create(RegisterSchool registerSchool){
        RegisterSchool cadastroEntitie = new RegisterSchool();

        if(cadastroEntitie.equals(registerSchool)){
            throw new SchoolAlreadyRegistered("Escola já cadastrada!");
        }

        return registerSchoolRepository.save(registerSchool);
    }

    public RegisterSchool edit(Integer id, RegisterSchool registerSchool){
        registerSchool.setId(id);
        return registerSchoolRepository.save(registerSchool);
    }

    public void delete(Integer id){
        registerSchoolRepository.deleteById(id);
    }
}
