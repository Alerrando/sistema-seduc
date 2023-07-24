package com.gerenciamentoescolas.server.exception;

public class LessonAlreadyRegistered extends RuntimeException {
    public LessonAlreadyRegistered(String message){
        super(message);
    }
}
