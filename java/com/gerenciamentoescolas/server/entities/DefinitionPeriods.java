package com.gerenciamentoescolas.server.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "definiton_periods")
public class DefinitionPeriods {
    @Id
    public Date startDate;
    public Date endDate;

    public DefinitionPeriods(){

    }

    public DefinitionPeriods(Date startDate, Date endDate){
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Date getStartDate(){
        return startDate;
    }

    public void setStartDate(Date startDate){
        this.startDate = startDate;
    }

    public Date getEndDate(){
        return endDate;
    }

    public void setEndDate(Date endDate){
        this.endDate = endDate;
    }
}
