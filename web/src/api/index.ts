import axios from "axios";
import { HorasInfos } from "../../slice";
const url = "http://localhost:8080/cadastro-aulas";

export async function readAll() {
  try {
    let aux = await axios.get(url)
      .then(response => response.data)
      .catch(error => console.log(error));
    return aux;
  } catch (error) {
    console.log(error);
  }
}

export async function create(info: HorasInfos){
  await axios.post(url, info)
  .then((response) => alert("Aula cadastrada com sucesso"))
  .catch((err) => console.log(err));
}

export async function edit(info: HorasInfos, id: number) {
  await axios.put(`${url}/${id}`, info)
  .then((response) => alert("Aula editada com sucesso"))
  .catch((err) => console.log(err));
}

export async function deleteAula(id: number) {
  await axios.delete(`${url}/${id}`)
  .then((response) => alert("Aula deletada com sucesso"))
  .catch((err) => console.log(err));
}