import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Persona } from '../models/persona';

const baseURL = 'http://localhost:8080/api/v1/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Persona[]>(baseURL);
  }

  // getById(id) {
  //   return this.http.get(`${baseURL}/${id}`);
  // }

  getByApellido(apellido: String) {
    return this.http.get<Persona>(`${baseURL}/search?apellido=${apellido}`);
  }

  // create(persona) {
  //   return this.http.post(baseURL, persona);
  // }

  // update(id, persona) {
  //   return this.http.put(`${baseURL}/${id}`, persona);
  // }

  // delete(id) {
  //   return this.http.delete(`${baseURL}/${id}`);
  // }

  // deleteAll() {
  //   return this.http.delete(baseURL);
  // }
}
