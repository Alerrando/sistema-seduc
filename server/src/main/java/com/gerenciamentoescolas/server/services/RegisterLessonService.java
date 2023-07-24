package com.gerenciamentoescolas.server.services;

import com.gerenciamentoescolas.server.entities.RegisterLesson;
import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import com.gerenciamentoescolas.server.entities.DefinitionPeriods;
import com.gerenciamentoescolas.server.exception.LessonAlreadyRegistered;
import com.gerenciamentoescolas.server.exception.DefinitionPeriodsException;
import com.gerenciamentoescolas.server.repository.RegisterLessonRepository;
import com.gerenciamentoescolas.server.repository.RegisterSchoolRepository;

import com.gerenciamentoescolas.server.repository.RegisterTeacherRepository;
import com.gerenciamentoescolas.server.repository.DefinitionPeriodsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegisterLessonService {
    @Autowired
    private RegisterLessonRepository registerLessonRepository;

    @Autowired
    private RegisterSchoolRepository registerSchoolRepository;

    @Autowired
    private RegisterTeacherRepository registerTeacherRepository;

    @Autowired
    private DefinitionPeriodsRepository definitionPeriodsRepository;

    public List<RegisterLesson> findAll(){
        List<RegisterLesson> result = registerLessonRepository.findAll();
        return result;
    }
    public Page<RegisterLesson> findAllPageable(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<RegisterLesson> result = registerLessonRepository.findAll(pageable);
        return result;
    }

    public List<RegisterLesson> findByCadastroProfessor(String name){
        List<RegisterTeacher> professores = registerTeacherRepository.filterByName(name);
        List<Integer> professoresIds = professores.stream().map(RegisterTeacher::getId).collect(Collectors.toList());

        return registerLessonRepository.findByCadastroProfessor(professoresIds);
    }

    public RegisterLesson create(RegisterLesson registerLesson, Integer escolaId, Integer professorId) {
        List<RegisterLesson> aulas = registerLessonRepository.findAll();
        List<DefinitionPeriods> definitionsPeriods = definitionPeriodsRepository.findAll();
        DefinitionPeriods lastDefinitionPeriods = definitionsPeriods.get(definitionsPeriods.size() - 1);

        LocalDate localDateCadastroAula = registerLesson.getLessonDay().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate startDatePeriod = lastDefinitionPeriods.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDatePeriod = lastDefinitionPeriods.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        if(localDateCadastroAula.compareTo(startDatePeriod) >= 0 && localDateCadastroAula.compareTo(endDatePeriod) <= 0){
            for (RegisterLesson aula : aulas){
                LocalDate localDateAula = aula.getLessonDay().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                if(localDateCadastroAula.equals(localDateAula) && registerLesson.getRegisterTeacher() == aula.getRegisterTeacher() && registerLesson.getRegisterSchool() == aula.getRegisterSchool()){
                    throw new LessonAlreadyRegistered("Aula já cadastrada");
                }
            }
        }
        else{
            throw new DefinitionPeriodsException("Não é possivel cadastrar uma aula depois ou antes da definição de período");
        }

        RegisterSchool school = registerSchoolRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
        RegisterTeacher teacher = registerTeacherRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        registerLesson.setRegisterSchool(school);
        registerLesson.setRegisterTeacher(teacher);

        return registerLessonRepository.save(registerLesson);
    }

    public RegisterLesson update(Integer escolaId, Integer professorId , RegisterLesson registerLesson){
        RegisterSchool school = registerSchoolRepository.findById(escolaId)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
        RegisterTeacher teacher = registerTeacherRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        registerLesson.setRegisterSchool(school);
        registerLesson.setRegisterTeacher(teacher);
        return registerLessonRepository.save(registerLesson);
    }

    public void delete(Integer id){
        registerLessonRepository.deleteById(id);
    }

}
