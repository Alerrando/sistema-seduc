package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String rg;
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_office")
    private RegisterOffice office;
    
    @ManyToOne
    @JoinColumn(name = "user_school")
    private RegisterSchool registerSchool;
    
    private Integer level;
    private Integer mandatoryBulletin;
    private Boolean inactive;

    public User(){
    }

    public User(Integer id, String name, String email, String rg, String password, RegisterOffice office, RegisterSchool registerSchool, Integer level, Integer mandatoryBulletin, Boolean inactive) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rg = rg;
        this.password = password;
        this.office = office;
        this.registerSchool = registerSchool;
        this.level = level;
        this.mandatoryBulletin = mandatoryBulletin;
        this.inactive = inactive;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RegisterOffice getOffice(){
        return office;
    }

    public void setOffice(RegisterOffice office) { 
        this.office = office;
    }

    public RegisterSchool getRegisterSchool() {
        return registerSchool;
    }

    public void setRegisterSchool(RegisterSchool registerSchool) {
        this.registerSchool = registerSchool;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getMandatoryBulletin() {
        return mandatoryBulletin;
    }

    public void setMandatoryBulletin(Integer mandatoryBulletin) {
        this.mandatoryBulletin = mandatoryBulletin;
    }

    public Boolean getInactive(){
        return inactive;
    }

    public void setInactive(Boolean inactive) {
        this.inactive = inactive;
    }
}
