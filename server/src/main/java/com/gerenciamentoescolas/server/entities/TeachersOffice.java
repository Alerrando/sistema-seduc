package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "teachers_office")
public class TeachersOffice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private RegisterTeacher registerTeacher;

    @ManyToOne
    @JoinColumn(name = "office_id")
    private RegisterOffice registerOffice;

    private TeachersOffice(){
    }

    private TeachersOffice(Integer id, RegisterTeacher registerTeacher, RegisterOffice registerOffice){
        this.id = id;
        this.registerTeacher = registerTeacher;
        this.registerOffice = registerOffice;
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

    public RegisterOffice getRegisterOffice() {
        return registerOffice;
    }

    public void setRegisterOffice(RegisterOffice registerOffice) {
        this.registerOffice = registerOffice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeachersOffice that = (TeachersOffice) o;
        return Objects.equals(id, that.id) && Objects.equals(registerTeacher, that.registerTeacher) && Objects.equals(registerOffice, that.registerOffice);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, registerTeacher, registerOffice);
    }
}
