package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.RegisterLesson;
import com.gerenciamentoescolas.server.services.RegisterLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://192.168.0.78:3000", "http://www3.rancharia.sp.gov.br"})
@RestController
@RequestMapping(value = "/security/cadastro-aulas")
public class RegisterLessonControllers {
    @Autowired
    private RegisterLessonService registerLessonService;

    @GetMapping
    public List<RegisterLesson> findAll(){
        List<RegisterLesson> result = registerLessonService.findAll();
        return result;
    }

    @GetMapping("/page")
    public Page<RegisterLesson> findPageable(@RequestParam int pageNumber, @RequestParam(defaultValue = "10") int pageSize){
        Page<RegisterLesson> result = registerLessonService.findAllPageable(pageNumber, pageSize);
        return result;
    }

    @GetMapping("/{name}")
    public List<RegisterLesson> findByRegisterTeacher(@PathVariable String name){
        List<RegisterLesson> aulas = registerLessonService.findByRegisterTeacher(name);
        return aulas;
    }

    @PostMapping("/{escolaId}&{professorId}")
    public RegisterLesson create(@PathVariable Integer escolaId, @PathVariable Integer professorId, @RequestBody RegisterLesson registerLesson) {
        return registerLessonService.create(registerLesson, escolaId, professorId);
    }

    @PutMapping("/{escolaId}&{professorId}")
    public RegisterLesson edit(@PathVariable Integer escolaId, @PathVariable Integer professorId, @RequestBody RegisterLesson registerLesson){
        return registerLessonService.edit(escolaId, professorId, registerLesson);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        registerLessonService.delete(id);
    }
}
