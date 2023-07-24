package com.gerenciamentoescolas.server.entities;

public class ErrorInfo {
    private String url;

    public ErrorInfo(){
    }

    public ErrorInfo(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
