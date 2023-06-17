INSERT INTO cadastro_professor (id, name, cpf) VALUES (1, 'Alerrando', '51858773830');
INSERT INTO cadastro_professor (id, name, cpf) VALUES (2, 'Rongo', '17713514031');

INSERT INTO cadastro_escola (id, name) VALUES (1, 'Escola Municipal Mario Fiorante');
INSERT INTO cadastro_escola (id, name) VALUES (2, 'Escola Estudal Professor Dom Antônio');

INSERT INTO cadastro_aulas (id, cadastro_professor, hora_aulas, titularidade, dia_aula, cadastro_escola) VALUES (1, 1, 20, 'Titular', '2023-06-17T03:00:00.000+00:00', 1);
INSERT INTO cadastro_aulas (id, cadastro_professor, hora_aulas, titularidade, dia_aula, cadastro_escola) VALUES (2, 1, 15, 'Titular', '2023-06-19T03:00:00.000+00:00', 1);
INSERT INTO cadastro_aulas (id, cadastro_professor, hora_aulas, titularidade, dia_aula, cadastro_escola) VALUES (3, 2, 9, 'Titular', '2023-06-17T03:00:00.000+00:00', 1);
INSERT INTO cadastro_aulas (id, cadastro_professor, hora_aulas, titularidade, dia_aula, cadastro_escola) VALUES (4, 2, 11, 'Titular', '2023-06-19T03:00:00.000+00:00', 1);
