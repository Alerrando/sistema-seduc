import axios from "axios";
import { LessonsInfos, SchoolInfos } from "../../slice";
const urlLesson = "http://localhost:8080/cadastro-aulas";
const urlSchool = "http://localhost:8080/cadastro-escola"

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

export async function createLesson(info: LessonsInfos){
  try {
    await axios.post(urlLesson, info)
    .then((response) => alert("Aula cadastrada com sucesso"))
    .catch((err) => console.log(err))
  } catch (error) {
    console.log(error);
  }
}

export async function editLesson(info: LessonsInfos, id: number) {
  try {
    await axios.put(`${urlLesson}/${id}`, info)
    .then((response) => alert("Aula editada com sucesso"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLesson(id: number) {
  try {
    await axios.delete(`${urlLesson}/${id}`)
    .then((response) => alert("Aula deletada com sucesso"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------- API SCHOOL ----------------------------- //

export async function readAllSchool() {
  try {
    let aux = await axios.get(urlSchool)
    .then((response) => response.data)
    .catch((err) => console.log(err))

    console.log(aux);
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createSchool(info: SchoolInfos){
  try {
    console.log(info);
    await axios.post(urlSchool, info)
    .then((response) => alert("Escola cadastrada com sucesso"))
    .catch((err) => console.log(err))
  } catch (error) {
    console.log(error);
  }
}

export async function editSchool(info: SchoolInfos, id: number) {
  try {
    await axios.put(`${urlSchool}/${id}`, info)
    .then((response) => alert("Escola editada com sucesso"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSchool(id: number) {
  try {
    await axios.delete(`${urlSchool}/${id}`)
    .then((response) => alert("Escola deletada com sucesso"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}