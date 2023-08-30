package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers_thirst")
public class RegisterTeachersThirst {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private RegisterTeacher registerTeacher;

    @ManyToOne
    @JoinColumn(name = "thirst_id")
    private RegisterSchool registerSchool;

    public RegisterTeachersThirst(){
    }

    public RegisterTeachersThirst(Integer id, RegisterTeacher registerTeacher, RegisterSchool registerSchool) {
        this.id = id;
        this.registerTeacher = registerTeacher;
        this.registerSchool = registerSchool;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RegisterTeacher getRegisterTeacher() {
        return registerTeacher;
    }

    public void setRegisterTeacher(RegisterTeacher registerTeacher) {
        this.registerTeacher = registerTeacher;
    }

    public RegisterSchool getRegisterSchool() {
        return registerSchool;
    }

    public void setRegisterSchool(RegisterSchool registerSchool) {
        this.registerSchool = registerSchool;
    }
}
