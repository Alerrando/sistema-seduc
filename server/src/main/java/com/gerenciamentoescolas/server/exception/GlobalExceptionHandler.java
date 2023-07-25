package com.gerenciamentoescolas.server.exception;

import com.gerenciamentoescolas.server.entities.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleMultipartException(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse("Não foi possível deletar pois o registro está associado a outro registro!");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
