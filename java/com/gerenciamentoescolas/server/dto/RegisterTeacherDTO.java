package com.gerenciamentoescolas.server.dto;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

public class RegisterTeacherDTO {
    private String name;
    private Integer amountTime;
    @Temporal(TemporalType.TIMESTAMP)
    private Date lessonDay;
    private RegisterSchool registerSchool;

    public RegisterTeacherDTO(){
    }

    public RegisterTeacherDTO(Integer amountTime, String name, Date lessonDay, RegisterSchool registerSchool) {
        this.amountTime = amountTime;
        this.name = name;
        this.lessonDay = lessonDay;
        this.registerSchool = registerSchool;
    }

    public Integer getAmountTime() {
        return amountTime;
    }

    public void setAmountTime(Integer amountTime) {
        this.amountTime = amountTime;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

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

}
