package com.gerenciamentoescolas.server.entities;

import java.util.ArrayList;

public class BulletinSchool {
    private Integer id;
    private String name;
    private ArrayList<Object[]> datesWork;
    private Integer amountTime;
    public BulletinSchool(){
    }

    public BulletinSchool(Integer id, String name, ArrayList<Object[]> datesWork, Integer amountTime){
        this.id = id;
        this.name = name;
        this.datesWork = datesWork;
        this.amountTime = amountTime;
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

}
