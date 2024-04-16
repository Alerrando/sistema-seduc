import axios from "axios";
import { UserInfos } from "../../slice/LoginSlice";
import { DefinitionPeriodsInfos, LessonInfos, OfficeInfos, SchoolInfos, TeacherInfos } from "../utils/type";

const urlLesson = "http://192.168.0.78:9090/security/cadastro-aulas";
const urlSchool = "http://192.168.0.78:9090/security/cadastro-escola";
const urlTeacher = "http://192.168.0.78:9090/security/cadastro-professor";
const urlUser = "http://192.168.0.78:9090/security/users";
const urlFree = "http://192.168.0.78:9090/free";
const urlDefinitionPeriods = "http://192.168.0.78:9090/security/definition-periods";
const urlOffice = "http://192.168.0.78:9090/security/office";
const urlTeachersOffice = "http://192.168.0.78:9090/security/teachers-office";
const urlTeachersThirst = "http://192.168.0.78:9090/security/teachers-thirst";

export async function readAllLesson() {
  try {
    const aux = await axios
      .get(urlLesson, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function readPaginationLesson(pageNumber: number, pageSize: number) {
  try {
    const aux = await axios
      .get(`${urlLesson}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => response.data.content)
      .catch((err) => err);

    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function createLesson(info: LessonInfos, schoolId: number, teacherId: number) {
  try {
    const message = await axios
      .post(`${urlLesson}/${schoolId}&${teacherId}`, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Aula cadastrada com sucesso")
      .catch((err) => err);

    console.log(message);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editLesson(info: LessonInfos, schoolId: number, teacherId: number) {
  try {
    const message = await axios
      .put(`${urlLesson}/${schoolId}&${teacherId}`, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Aula editada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLesson(id: number) {
  try {
    const message = await axios
      .delete(`${urlLesson}/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Aula deletada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------- ROUTER SCHOOL ----------------------------- //

export async function readAllSchool() {
  try {
    const aux = await axios
      .get(urlSchool, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => response.data)
      .catch((err) => err);

    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function getIdSchool(id: number) {
  const aux = await axios
    .get(`${urlSchool}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return aux;
}

export async function createSchool(info: SchoolInfos) {
  try {
    const message = await axios
      .post(urlSchool, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Escola cadastrada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editSchool(info: SchoolInfos, id: number) {
  try {
    const message = await axios
      .put(`${urlSchool}/${id}`, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Escola editada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSchool(id: number) {
  try {
    const message = await axios
      .delete(`${urlSchool}/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Escola deletada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------- ROUTER TEACHER ----------------------------- //

export async function readAllTeacher() {
  try {
    const aux = await axios
      .get(urlTeacher, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => response.data)
      .catch((err) => err);

    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function getNameByIdTeacher(id: number) {
  let aux: TeacherInfos = await axios
    .get(`${urlTeacher}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => (aux = res.data))
    .catch((err) => err);

  return aux;
}

export async function createTeacher(info: TeacherInfos) {
  try {
    const message = await axios
      .post(`${urlTeacher}`, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => res.data)
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function editTeacher(info: TeacherInfos) {
  try {
    const message = await axios
      .put(`${urlTeacher}`, info, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => res.data)
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTeacher(id: number) {
  try {
    const message = await axios
      .delete(`${urlTeacher}/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => "Professor deletada com sucesso")
      .catch((err) => err);

    return message;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------- ROUTER REPORTS ----------------------------- //]
export async function getReportsSchool(schoolId: number, startDate: Date, endDate: Date) {
  const aux = await axios
    .get(`${urlSchool}/relatorio/${schoolId}&${startDate}&${endDate}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return aux;
}

export async function getReportsTeacher(teacherId: number, startDate: Date, endDate: Date) {
  const aux = await axios
    .get(`${urlTeacher}/boletim/${teacherId}&${startDate}&${endDate}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return aux;
}

// ----------------------------- ROUTER USER ----------------------------- //
export async function findAllUser() {
  const message = await axios
    .get(urlUser, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function getUserByEmail(email: string, password: string, token: string) {
  const message = await axios
    .get(`${urlUser}/find/${email}&${password}`, {
      headers: { Authorization: token },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function getUserByMandatoryBulletin() {
  const message = await axios
    .get(`${urlUser}/bulletin`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function getUserByIdSchool(schoolId: number) {
  const message = await axios
    .get(`${urlUser}/school/${schoolId}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function createUser(user: UserInfos) {
  const message = await axios
    .post(`${urlUser}`, user, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Usuário criado com sucesso")
    .catch((err) => err);

  return message;
}

export async function editUser(user: UserInfos, id: number) {
  const message = await axios
    .put(`${urlUser}/${id}`, user, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Usuário Editado com sucesso!")
    .catch((err) => err);

  return message;
}

export async function deleteUser(id: number) {
  const message = await axios
    .delete(`${urlUser}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Usuário deletado com sucesso!")
    .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Free ----------------------------- //
export async function createToken() {
  const aux = await axios
    .get(`${urlFree}`)
    .then((res) => res.data)
    .catch((err) => err);

  return aux;
}

// ----------------------------- ROUTER DefinitionPeriods ---------------- //
export async function findAllDefinitionPeriods() {
  const message = await axios
    .get(urlDefinitionPeriods, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function createDefinitionPeriods(infos: DefinitionPeriodsInfos) {
  const message = await axios
    .post(urlDefinitionPeriods, infos, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .then(() => "Definição de períodos definidas com sucesso!")
    .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Register Office ---------------- //
export async function getRegisterOffice() {
  const aux = axios
    .get(urlOffice, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err.message);

  return aux;
}

export async function getOfficeById(id: number) {
  const aux = axios
    .get(`${urlOffice}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err.message);

  return aux;
}

export async function createRegisterOffice(infos: OfficeInfos) {
  const message = axios
    .post(urlOffice, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargo cadastrado com sucesso!")
    .catch((err) => err);

  return message;
}

export async function editRegisterOffice(infos: OfficeInfos, id: number) {
  const message = axios
    .put(`${urlOffice}/${id}`, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargo editado com sucesso!")
    .catch((err) => err);

  return message;
}

export async function deleteRegisterOffice(id: number) {
  const message = axios
    .delete(`${urlOffice}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargo deletado com sucesso!")
    .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Teachers Office ---------------- //

export async function findAllTeachersOffice() {
  const message = await axios
    .get(urlTeachersOffice, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function findTeachersOfficeById(teacherId: number) {
  const message = await axios
    .get(`${urlTeachersOffice}/${teacherId}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function createTeachersOffice(infos: number[], teacherId: number) {
  const message = await axios
    .post(`${urlTeachersOffice}/${teacherId}`, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargos Cadastrados")
    .catch((err) => err);

  return message;
}

export async function editTeacherOffice(infos: number[], teacherId: number) {
  const message = await axios
    .put(`${urlTeachersOffice}/${teacherId}`, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargos Editado com Sucesso")
    .catch((err) => err);

  return message;
}

// ----------------------------- ROUTER Teachers Thirst ---------------- //
export async function findAllTeachersThirst() {
  const message = await axios
    .get(urlTeachersThirst, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function findTeachersThirstById(teacherId: number) {
  const message = await axios
    .get(`${urlTeachersThirst}/${teacherId}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return message;
}

export async function createTeachersThirst(infos: number[], teacherId: number) {
  const message = await axios
    .post(`${urlTeachersThirst}/${teacherId}`, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Sede Cadastrada")
    .catch((err) => err);

  return message;
}

export async function editTeacherThirst(infos: number[], teacherId: number) {
  const message = await axios
    .put(`${urlTeachersThirst}/${teacherId}`, infos, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then(() => "Cargos Editado com Sucesso")
    .catch((err) => err);

  return message;
}
