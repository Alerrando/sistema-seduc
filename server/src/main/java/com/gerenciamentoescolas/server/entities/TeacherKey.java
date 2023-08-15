package com.gerenciamentoescolas.server.entities;

import java.util.Date;
import java.util.Objects;

public class TeacherKey {
    private Date date;
    private int registerTeacherId;
    private int registerSchoolId;

    public TeacherKey(){
    }

    public TeacherKey(Date date, int registerTeacherId, int registerSchoolId) {
        this.date = date;
        this.registerTeacherId = registerTeacherId;
        this.registerSchoolId = registerSchoolId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getRegisterTeacherId() {
        return registerTeacherId;
    }

    public void setRegisterTeacherId(int registerTeacherId) {
        this.registerTeacherId = registerTeacherId;
    }

    public int getRegisterSchoolId() {
        return registerSchoolId;
    }

    public void setRegisterSchoolId(int registerSchoolId) {
        this.registerSchoolId = registerSchoolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeacherKey that = (TeacherKey) o;
        return registerTeacherId == that.registerTeacherId && registerSchoolId == that.registerSchoolId && Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, registerTeacherId, registerSchoolId);
    }
}
