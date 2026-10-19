import axios from "axios";
import { Global } from "../Global";

export default class SeriesService{
    
    async getAllSeries(){
        let result = await axios.get(Global.apiUrl + "/Series");
        if(result.status === 200) return result.data;
        else return null
    }

    async getAllPersonajes(){
        let result = await axios.get(Global.apiUrl + "/Personajes");
        if(result.status === 200) return result.data;
        else return null;
    }

    async getSerieById(id){
        let result = await axios.get(Global.apiUrl + "/Series/" + id);
        if(result.status === 200) return result.data;
        else return null
    }

    async getPersonajesFromSerieId(id) {
        let result = await axios.get(Global.apiUrl + "/Series/PersonajesSerie/" + id);
        if(result.status === 200) return result.data;
        else return null;
    }

    async insertPersonaje(personaje){
        let result = await axios.post(Global.apiUrl + "/Personajes", personaje);
        if(result.status === 200) return true;
        else return false; 
    }

    async updatePersonaje(personaje){
        let result = await axios.put(Global.apiUrl + "/Personajes", personaje);
        if(result.status === 200) return true;
        else return false;
    }

}   