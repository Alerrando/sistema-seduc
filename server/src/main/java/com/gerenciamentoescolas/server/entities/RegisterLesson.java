package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "register_lesson")
public class RegisterLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "teacher_Id")
    private RegisterTeacher registerTeacher;
    private Integer amountTime;
    @Temporal(TemporalType.TIMESTAMP)
    private Date lessonDay;
    @ManyToOne
    @JoinColumn(name = "school_id")
    private RegisterSchool registerSchool;

    public RegisterLesson(){
    }

    public RegisterLesson(Integer id, RegisterTeacher registerTeacher, Integer amountTime, Date lessonDay, RegisterSchool registerSchool) {
        this.id = id;
        this.registerTeacher = registerTeacher;
        this.amountTime = amountTime;
        this.lessonDay = lessonDay;
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

    public Integer getAmountTime() {
        return amountTime;
    }

    public void setAmountTime(Integer amountTime) {
        this.amountTime = amountTime;
    }

    public Date getLessonDay() {
        return lessonDay;
    }

    public void setLessonDay(Date lessonDay) {
        this.lessonDay = lessonDay;
    }

    public RegisterSchool getRegisterSchool() {
        return registerSchool;
    }

    public void setRegisterSchool(RegisterSchool registerSchool) {
        this.registerSchool = registerSchool;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegisterLesson that = (RegisterLesson) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
