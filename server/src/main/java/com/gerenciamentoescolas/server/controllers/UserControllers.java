package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.User;
import com.gerenciamentoescolas.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/users")
public class UserControllers {
    @Autowired
    UserService userService;

    @GetMapping
    public List<User> findAll(){
        List<User> result = userService.findAll();
        return result;
    }

    @GetMapping("/find/{email}&{password}")
    public ResponseEntity<Object> getUserByEmailPassword(@PathVariable String email, @PathVariable String password){
        return userService.getUserByEmailPassword(email, password);
    }

    @GetMapping("/bulletin")
    public List<User> getUserByMandatoryBulletin(){
        return userService.getUserByMandatoryBulletin();
    }

    @GetMapping("/school/{schoolId}")
    public ResponseEntity<User> getUserBySchoolId(@PathVariable Integer schoolId){
        return userService.getUserBySchoolId(schoolId);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody User user){
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public User edit(@RequestBody User user, @PathVariable Integer id){
        return userService.edit(user, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        userService.delete(id);
    }
}