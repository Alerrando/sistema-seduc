import axios from "axios";
import { LessonsInfos, SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from "../../slice";
import { UserInfos } from "../../slice/LoginSlide";

const urlLesson = "http://localhost:8080/security/cadastro-aulas";
const urlSchool = "http://localhost:8080/security/cadastro-escola";
const urlTeacher = "http://localhost:8080/security/cadastro-professor";
const urlUser = "http://localhost:8080/security/users";
const urlFree = "http://localhost:8080/free";

export async function readAllLesson() {
  try {
    let aux = await axios.get(urlLesson, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then(response => response.data)
    .catch(error => console.log(error));
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function readPaginationLesson(pageNumber: number, pageSize: number) {
  try {
    let aux = await axios.get(`${urlLesson}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => response.data.content)
    .catch((err) => console.log(err))

    return aux;
  } catch (error) {
    console.log(error)
  }
}

export async function createLesson(info: LessonsInfos, escolaId: number, professorId: number){
  try {
    const message = await axios.post(`${urlLesson}/${escolaId}&${professorId}`,info , {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Aula cadastrada com sucesso")
    .catch((err) => err);

    console.log(message);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editLesson(info: LessonsInfos, escolaId: number, professorId: number) {
  try {
    const message = await axios.put(`${urlLesson}/${escolaId}&${professorId}`, info,{
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Aula editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLesson(id: number) {
  try {
    const message = await axios.delete(`${urlLesson}/${id}`, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
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
    let aux = await axios.get(urlSchool, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err))
    
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createSchool(info: SchoolInfos){
  try {
    const message = await axios.post(urlSchool, info, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Escola cadastrada com sucesso")
    .catch((err) => err)

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editSchool(info: SchoolInfos, id: number) {
  try {
    const message = await axios.put(`${urlSchool}/${id}`, info, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Escola editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSchool(id: number) {
  try {
    const message = await axios.delete(`${urlSchool}/${id}`, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Escola deletada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getIdSchool(id: string) {
  let aux: SchoolInfos = {};
  
  await axios.get(`${urlSchool}/${id}}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux.name;
}

// ----------------------------- ROUTER TEACHER ----------------------------- //

export async function readAllTeacher() {
  try {
    let aux = await axios.get(urlTeacher, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err))
    
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createTeacher(info: TeacherInfos, idEscola: string){
  try {
    const message = await axios.post(`${urlTeacher}/${idEscola}`, info, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Professor cadastrada com sucesso")
    .catch((err) => err)

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editTeacher(info: TeacherInfos, idEscola: string) {
  try {
    const message = await axios.put(`${urlTeacher}/${idEscola}`, info, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Professor editada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTeacher(id: number) {
  try {
    const message = await axios.delete(`${urlTeacher}/${id}`, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
    .then((response) => "Professor deletada com sucesso")
    .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getNameByIdTeacher(id: string) {
  let aux: TeacherInfos = {};
  
  await axios.get(`${urlTeacher}/${id}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux;
}

// ----------------------------- ROUTER REPORTS ----------------------------- //]
export async function getReportsSchool() {
  let aux:SchoolDTOInfos = {};
  await axios.get(`${urlSchool}/relatorio`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux;
}

export async function getReportsTeacher(idProfessor: string, dataInicial: Date, dataFinal: Date) {
  let aux:TeacherDTOInfos = {};
  await axios.get(`${urlTeacher}/boletim/${idProfessor}&${dataInicial}&${dataFinal}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux;
}

// ----------------------------- ROUTER USER ----------------------------- //
export async function getUsers() {
  let aux = await axios.get(urlUser)
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}

export async function getUserByEmail(email: string, password: string, token: string){
  let aux = await axios.get(`${urlUser}/find/${email}&${password}`, {
    headers: { 'Authorization':  token },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}

export async function createUser(user: UserInfos) {
  let aux = await axios.post(`${urlUser}`, user)
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}

// ----------------------------- ROUTER Free ----------------------------- //
export async function createToken(){
  let aux = await axios.get(urlFree)
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}