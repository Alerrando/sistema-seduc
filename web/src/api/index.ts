import axios from "axios";
import { DefinitionPeriodsInfos, LessonsInfos, OfficeInfos, SchoolInfos, TeacherInfos, TeacherValuesDefault } from "../../slice";
import { UserInfos } from "../../slice/LoginSlice";

const urlLesson = "http://localhost:9090/security/cadastro-aulas";
const urlSchool = "http://localhost:9090/security/cadastro-escola";
const urlTeacher = "http://localhost:9090/security/cadastro-professor";
const urlUser = "http://localhost:9090/security/users";
const urlFree = "http://localhost:9090/free";
const urlDefinitionPeriods = "http://localhost:9090/security/definition-periods";
const urlOffice = "http://localhost:9090/security/office";

export async function readAllLesson() {
	try {
		const aux = await axios.get(urlLesson, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const aux = await axios.get(`${urlLesson}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then((response) => response.data.content)
			.catch((err) => console.log(err));

		return aux;
	} catch (error) {
		console.log(error);
	}
}

export async function createLesson(info: LessonsInfos, escolaId: number, professorId: number){
	try {
		const message = await axios.post(`${urlLesson}/${escolaId}&${professorId}`,info , {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then(() => "Aula cadastrada com sucesso")
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
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const message = await axios.delete(`${urlLesson}/${id}`, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const aux = await axios.get(urlSchool, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then((response) => response.data)
			.catch((err) => console.log(err));
    
		return aux;
	} catch (error) {
		console.log(error);
	}
}

export async function getIdSchool(id: string) {  
	const aux = await axios.get(`${urlSchool}/${id}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return aux;
}

export async function createSchool(info: SchoolInfos){
	try {
		const message = await axios.post(urlSchool, info, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const message = await axios.put(`${urlSchool}/${id}`, info, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const message = await axios.delete(`${urlSchool}/${id}`, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
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
		const aux = await axios.get(urlTeacher, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then((response) => response.data)
			.catch((err) => console.log(err));
    
		return aux;
	} catch (error) {
		console.log(error);
	}
}

export async function getNameByIdTeacher(id: string) {
	let aux: TeacherInfos = TeacherValuesDefault;
  
	await axios.get(`${urlTeacher}/${id}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then((res) => (aux = res.data))
		.catch((err) => console.log(err));

	return aux;
}

export async function createTeacher(info: TeacherInfos, idEscola: number){
	try {
		const message = await axios.post(`${urlTeacher}/${idEscola}`, info, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then(() => "Professor cadastrada com sucesso")
			.catch((err) => err);

		return message;
	} catch (error) {
		console.log(error);
	}
}

export async function editTeacher(info: TeacherInfos, idEscola: number) {
	try {
		const message = await axios.put(`${urlTeacher}/${idEscola}`, info, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then(() => "Professor editada com sucesso")
			.catch((err) => err);

		return message;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteTeacher(id: number) {
	try {
		const message = await axios.delete(`${urlTeacher}/${id}`, {
			headers: { "Authorization":  `${localStorage.getItem("token")}` },
		})
			.then(() => "Professor deletada com sucesso")
			.catch((err) => err);

		return message;
	} catch (error) {
		console.log(error);
	}
}


// ----------------------------- ROUTER REPORTS ----------------------------- //]
export async function getReportsSchool(schoolId: string, startDate: Date, endDate: Date) {
	const aux = await axios.get(`${urlSchool}/relatorio/${schoolId}&${startDate}&${endDate}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return aux;
}

export async function getReportsTeacher(teacherId: string, startDate: Date, endDate: Date) {
	const aux = await axios.get(`${urlTeacher}/boletim/${teacherId}&${startDate}&${endDate}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return aux;
}

// ----------------------------- ROUTER USER ----------------------------- //
export async function findAllUser() {
	const message = await axios.get(urlUser, {
		headers: { 
			"Authorization":  `${localStorage.getItem("token")}`,
		},
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return message;
}

export async function getUserByEmail(email: string, password: string, token: string){
	const message = await axios.get(`${urlUser}/find/${email}&${password}`, {
		headers: { "Authorization":  token },
	})
		.then((res) => res.data)
		.catch((err) => console.log(err));

	return message;
}

export async function getUserByMandatoryBulletin(){
	const message = await axios.get(`${urlUser}/bulletin`, {
		headers: { "Authorization": `${localStorage.getItem("token")}` }
	})
		.then((res) => res.data)
		.catch((err) => err);

	return message;
}

export async function getUserByIdSchool(schoolId: number){
	const message = await axios.get(`${urlUser}/school/${schoolId}`, {
		headers: { "Authorization": `${localStorage.getItem("token")}` }
	})
		.then((res) => res.data)
		.catch((err) => err);

	return message;
}

export async function createUser(user: UserInfos) {
	const message = await axios.post(`${urlUser}`, user, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Usuário criado com sucesso")
		.catch((err) => console.log(err));

	return message;
}

export async function editUser(user: UserInfos, id: number){
	const message = await axios.put(`${urlUser}/${id}`, user, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Usuário Editado com sucesso!")
		.catch((err) => err);

	return message;
}

export async function deleteUser(id: number){
	const message = await axios.delete(`${urlUser}/${id}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Usuário deletado com sucesso!")
		.catch((err) => err);

	return message;
}

// ----------------------------- ROUTER Free ----------------------------- //
export async function createToken(){
	const aux = await axios.get(`${urlFree}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
  
	return aux;
}


// ----------------------------- ROUTER DefinitionPeriods ---------------- //
export async function findAllDefinitionPeriods(){
	const message = await axios.get(urlDefinitionPeriods, {
		headers: { 
			"Authorization": `${localStorage.getItem("token")}`,
		}
	})
		.then((res) => res.data)
		.catch((err) => err);

	return message;
}

export async function createDefinitionPeriods(infos: DefinitionPeriodsInfos) {
	const message = await axios.post(urlDefinitionPeriods, infos, {
		headers: { 
			"Authorization": `${localStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	})
		.then(() => "Definição de períodos definidas com sucesso!")
		.catch((err) => err);

	return message;
}

// ----------------------------- ROUTER Register Office ---------------- //
export async function getRegisterOffice() {
	const aux = axios.get(urlOffice, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then((res) => res.data)
		.catch((err) => err.message);

	return aux;
}

export async function getOfficeById(id: number){
	const aux = axios.get(`${urlOffice}/${id}`, {
		headers: { "Authorization": `${localStorage.getItem("token")}` },
	})
		.then((res) => res.data)
		.catch((err) => err.message);

	return aux;
	
}

export async function createRegisterOffice(infos: OfficeInfos) {
	const message = axios.post(urlOffice, infos, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Cargo cadastrado com sucesso!")
		.catch((err) => err);

	return message;
}

export async function editRegisterOffice(infos: OfficeInfos, id: number) {
	const message = axios.put(`${urlOffice}/${id}`, infos, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Cargo editado com sucesso!")
		.catch((err) => err);

	return message;
}

export async function deleteRegisterOffice(id: number){
	const message = axios.delete(`${urlOffice}/${id}`, {
		headers: { "Authorization":  `${localStorage.getItem("token")}` },
	})
		.then(() => "Cargo deletado com sucesso!")
		.catch((err) => err);

	return message;
}