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

export function create(info: HorasInfos){

}