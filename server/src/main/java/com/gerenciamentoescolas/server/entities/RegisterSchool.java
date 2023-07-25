package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "register_school")
public class RegisterSchool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String adress;
    private String zip;
    private String fone;
    private String email;
    private Boolean inactive;

    public RegisterSchool(){
    }

    public RegisterSchool(Integer id, String name, String adress, String zip, String fone, String email, Boolean inactive) {
        this.id = id;
        this.name = name;
        this.adress = adress;
        this.zip = zip;
        this.fone = fone;
        this.email = email;
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

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getFone() {
        return fone;
    }

    public void setFone(String fone) {
        this.fone = fone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getInactive(){
        return inactive;
    }

    public void setInactive(Boolean inactive) {
        this.inactive = inactive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegisterSchool that = (RegisterSchool) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(adress, that.adress) && Objects.equals(zip, that.zip) && Objects.equals(fone, that.fone) && Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, adress, zip, fone, email);
    }
}