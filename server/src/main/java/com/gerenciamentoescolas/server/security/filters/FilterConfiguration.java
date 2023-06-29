package com.gerenciamentoescolas.server.security.filters;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@CrossOrigin
public class FilterConfiguration {
    @Bean
    public FilterRegistrationBean<AccessFilter> registrationBean(){
        FilterRegistrationBean<AccessFilter> register = new FilterRegistrationBean<>();
        register.setFilter(new AccessFilter());
        register.addUrlPatterns("/security/*");
        return register;
    }
}
