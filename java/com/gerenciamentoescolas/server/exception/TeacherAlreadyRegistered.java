package com.gerenciamentoescolas.server.exception;


public class TeacherAlreadyRegistered extends RuntimeException {
    public TeacherAlreadyRegistered(String message){
        super(message);
    }
}
