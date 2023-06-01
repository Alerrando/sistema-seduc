import axios from "axios";
const url = "http://localhost:8080/cadastro-aulas";

export function readAll() {
  try {
    axios.get(url)
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

  } catch (error) {
    console.log(error);
  }
}
