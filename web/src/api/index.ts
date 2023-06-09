import axios from "axios";
import { DefinitionPeriodsInfos, LessonsInfos, OfficeInfos, SchoolDTOInfos, SchoolInfos, SchoolValuesDefault, TeacherDTOInfos, TeacherInfos, TeacherValuesDefault } from "../../slice";
import { UserInfos } from "../../slice/LoginSlide";

const urlLesson = "http://localhost:8080/security/cadastro-aulas";
const urlSchool = "http://localhost:8080/security/cadastro-escola";
const urlTeacher = "http://localhost:8080/security/cadastro-professor";
const urlUser = "http://localhost:8080/security/users";
const urlFree = "http://localhost:8080/free";
const urlDefinitionPeriods = "http://localhost:8080/security/definition-periods";
const urlOffice = "http://localhost:8080/security/office";

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

export async function createLesson(info: LessonsInfos, escolaId: string, professorId: string){
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

export async function editLesson(info: LessonsInfos, escolaId: string, professorId: string) {
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
  const aux = await axios.get(`${urlSchool}/${id}}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => res.data)
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
  let aux: TeacherInfos = TeacherValuesDefault;
  
  await axios.get(`${urlTeacher}/${id}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => (aux = res.data))
  .catch((err) => console.log(err))

  return aux;
}

// ----------------------------- ROUTER REPORTS ----------------------------- //]
export async function getReportsSchool() {
  const aux = await axios.get(`${urlSchool}/relatorio`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}

export async function getReportsTeacher(idProfessor: string, dataInicial: Date, dataFinal: Date) {
  const aux = await axios.get(`${urlTeacher}/boletim/${idProfessor}&${dataInicial}&${dataFinal}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return aux;
}

// ----------------------------- ROUTER USER ----------------------------- //
export async function getUsers() {
  let message = await axios.get(urlUser, {
    headers: { 
      'Authorization':  `${localStorage.getItem("token")}`,
    },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return message;
}

export async function getUserByEmail(email: string, password: string, token: string){
  let message = await axios.get(`${urlUser}/find/${email}&${password}`, {
    headers: { 'Authorization':  token },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))

  return message;
}

export async function createUser(user: UserInfos, token: string) {
  let message = await axios.post(`${urlUser}`, user, {
    headers: { 'Authorization':  `${token}` },
  })
  .then((res) => "Usuário criado com sucesso")
  .catch((err) => console.log(err))

  return message;
}

export async function editUser(user: UserInfos, id: number){
  let message = await axios.put(`${urlUser}/${id}`, user, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => res.data)
  .catch((err) => err)

  return message;
}

export async function deleteUser(id: number){
  let message = await axios.delete(`${urlUser}/${id}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => "Usuário deletado com sucesso!")
  .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Free ----------------------------- //
export async function createToken(userDefault: UserInfos){
  let aux = await axios.get(`${urlFree}`, {
    data: userDefault
  })
  .then((res) => res.data)
  .catch((err) => console.log(err))
  
  return aux;
}


// ----------------------------- ROUTER DefinitionPeriods ---------------- //
export async function getDefinitionPeriods(){
  let message = await axios.get(urlDefinitionPeriods, {
    headers: { 
      'Authorization': `${localStorage.getItem("token")}`,
    }
  })
  .then((res) => res.data)
  .catch((err) => err);

  return message;
}

export async function createDefinitionPeriods(infos: DefinitionPeriodsInfos) {
  let message = await axios.post(urlDefinitionPeriods, infos, {
    headers: { 
      'Authorization': `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => "Definição de períodos definidas com sucesso!")
  .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Register Office ---------------- //
export async function getRegisterOffice() {
  let aux = axios.get(urlOffice, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => res.data)
  .catch((err) => err.message)

  return aux;
}

export async function createRegisterOffice(infos: OfficeInfos) {
  let message = axios.post(urlOffice, infos, {
      headers: { 'Authorization':  `${localStorage.getItem("token")}` },
    })
   .then((res) => "Cargo cadastrado com sucesso!")
   .catch((err) => err)

   return message;
}

export async function editRegisterOffice(infos: OfficeInfos, id: number) {
  let message = axios.put(`${urlOffice}/${id}`, infos, {
        headers: { 'Authorization':  `${localStorage.getItem("token")}` },
      })
    .then((res) => "Cargo editado com sucesso!")
    .catch((err) => err)

    return message;
}

export async function deleteRegisterOffice(id: number){
  let message = axios.delete(`${urlOffice}/${id}`, {
    headers: { 'Authorization':  `${localStorage.getItem("token")}` },
  })
  .then((res) => "Cargo deletado com sucesso!")
  .catch((err) => err)

  return message;
}