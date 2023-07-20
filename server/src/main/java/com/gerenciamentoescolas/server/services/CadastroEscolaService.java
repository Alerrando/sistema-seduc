package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.dto.CadastroEscolaDTO;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import com.gerenciamentoescolas.server.exception.EscolaJaCadastradaException;
import com.gerenciamentoescolas.server.repository.CadastroEscolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CadastroEscolaService {
    @Autowired
    private CadastroEscolaRepository cadastroEscolaRepository;

    public List<CadastroEscola> findAll(){
        List<CadastroEscola> result = cadastroEscolaRepository.findAll();
        return result;
    }

    public List<CadastroEscolaDTO> findEscolasAulas(String schoolId, Date startDate, Date endDate) {
        Integer idSchool = Integer.parseInt(schoolId);
        List<Object[]> results = cadastroEscolaRepository.findEscolasAulas(idSchool, startDate, endDate);
        Map<Integer, CadastroEscolaDTO> escolasAulas = new HashMap<>();

        for (Object[] result : results) {
            Integer id = (Integer) result[0];
            String name = (String) result[1];
            Date dataAula = (Date) result[2];
            Long quantidadeAulas = Long.valueOf("0");
            String cargo = (String) result[4];

            CadastroEscolaDTO cadastroEscolaDTO = escolasAulas.get(id);
            
            if (result[4] != null) {
                quantidadeAulas = (Long) result[3];
            }

            if (cadastroEscolaDTO == null) {

                cadastroEscolaDTO = new CadastroEscolaDTO(id, name, new ArrayList<Object[]>(), quantidadeAulas.intValue(), cargo);
                escolasAulas.put(id, cadastroEscolaDTO);
            } else {
                cadastroEscolaDTO.setQuantidadeAulas(cadastroEscolaDTO.getQuantidadeAulas() + quantidadeAulas.intValue());
            }

            cadastroEscolaDTO.getDatesWork().add(new Object[]{dataAula, quantidadeAulas});
        }

        return new ArrayList<>(escolasAulas.values());
    }

    public CadastroEscola create(CadastroEscola cadastroEscola){
        CadastroEscola cadastroEntitie = new CadastroEscola();

        if(cadastroEntitie.equals(cadastroEscola)){
            throw new EscolaJaCadastradaException("Escola já cadastrada!");
        }

        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public CadastroEscola edit(Integer id, CadastroEscola cadastroEscola){
        cadastroEscola.setId(id);
        return cadastroEscolaRepository.save(cadastroEscola);
    }

    public void delete(Integer id){
        cadastroEscolaRepository.deleteById(id);
    }

    public CadastroEscola findById(Integer id) {
        return cadastroEscolaRepository.findById(id).orElse(null);
    }
}
