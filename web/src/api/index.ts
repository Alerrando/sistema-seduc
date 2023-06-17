import axios from "axios";
import { LessonsInfos, SchoolDTOInfos, SchoolInfos, TeacherInfos } from "../../slice";
const urlLesson = "http://localhost:8080/cadastro-aulas";
const urlSchool = "http://localhost:8080/cadastro-escola";
const urlTeacher = "http://localhost:8080/cadastro-professor";

export async function readAllLesson() {
  try {
    let aux = await axios.get(urlLesson)
      .then(response => response.data)
      .catch(error => console.log(error));
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function readPaginationLesson(pageNumber: number, pageSize: number) {
  try {
    let aux = await axios.get(`${urlLesson}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data.content)
    .catch((err) => console.log(err))

    return aux;
  } catch (error) {
    console.log(error)
  }
}

export async function createLesson(info: LessonsInfos, escolaId: number, professorId: number){
  try {
    const message = await axios.post(`${urlLesson}/${escolaId}&${professorId}`, info)
    .then((response) => "Aula cadastrada com sucesso")
    .catch((err) => err)

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editLesson(info: LessonsInfos, escolaId: number, professorId: number) {
  try {
    const message = await axios.put(`${urlLesson}/${escolaId}&${professorId}`, info)
    .then((response) => "Aula editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLesson(id: number) {
  try {
    const message = await axios.delete(`${urlLesson}/${id}`)
    .then((response) => "Aula deletada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------- ROUTER SCHOOL ----------------------------- //

export async function readAllSchool() {
  try {
    let aux = await axios.get(urlSchool)
    .then((response) => response.data)
    .catch((err) => console.log(err))
    
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createSchool(info: SchoolInfos){
  try {
    const message = await axios.post(urlSchool, info)
    .then((response) => "Escola cadastrada com sucesso")
    .catch((err) => err)

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editSchool(info: SchoolInfos, id: number) {
  try {
    const message = await axios.put(`${urlSchool}/${id}`, info)
    .then((response) => "Escola editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSchool(id: number) {
  try {
    const message = await axios.delete(`${urlSchool}/${id}`)
    .then((response) => "Escola deletada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getIdSchool(id: string) {
  let aux: SchoolInfos = {};
  console.log(id);
  
  await axios.get(`${urlSchool}/${id}}`)
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux.name;
}

// ----------------------------- ROUTER TEACHER ----------------------------- //

export async function readAllTeacher() {
  try {
    let aux = await axios.get(urlTeacher)
    .then((response) => response.data)
    .catch((err) => console.log(err))
    
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createTeacher(info: TeacherInfos){
  try {
    const message = await axios.post(urlTeacher, info)
    .then((response) => "Escola cadastrada com sucesso")
    .catch((err) => err)

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editTeacher(info: TeacherInfos, id: number) {
  try {
    const message = await axios.put(`${urlTeacher}/${id}`, info)
    .then((response) => "Escola editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTeacher(id: number) {
  try {
    const message = await axios.delete(`${urlTeacher}/${id}`)
    .then((response) => "Escola deletada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getIdTeacher(id: string) {
  let aux: TeacherInfos = {};
  
  await axios.get(`${urlTeacher}/${id}}`)
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux.name;
}

// ----------------------------- ROUTER REPORTS ----------------------------- //]
export async function getReportsSchool() {
  let aux:SchoolDTOInfos = {};
  await axios.get(`${urlSchool}/relatorio`)
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux;
}