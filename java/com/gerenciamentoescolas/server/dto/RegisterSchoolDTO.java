package com.gerenciamentoescolas.server.dto;

import java.util.ArrayList;

public class RegisterSchoolDTO {
    private Integer id;
    private String name;
    private ArrayList<Object[]> datesWork;
    private Integer amountTime;
    private String office;

    public RegisterSchoolDTO(){
    }

    public RegisterSchoolDTO(Integer id, String name, ArrayList<Object[]> datesWork, Integer amountTime, String office){
        this.id = id;
        this.name = name;
        this.datesWork = datesWork;
        this.amountTime = amountTime;
        this.office = office;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAmountTime() {
        return amountTime;
    }

    public void setAmountTime(Integer amountTime) {
        this.amountTime = amountTime;
    }

    public ArrayList<Object[]> getDatesWork(){
        return datesWork;
    }

    public void setDatesWork(ArrayList<Object[]> datesWork){
        this.datesWork = datesWork;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }
}
