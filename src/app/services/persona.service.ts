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

  getById(id: number) {
    return this.http.get<Persona>(`${baseURL}/${id}`);
  }

  create(persona: Persona) {
    return this.http.post<Persona>(baseURL, persona);
  }

  update(id: number, persona: Persona) {
    return this.http.put<Persona>(`${baseURL}/${id}`, persona);
  }

  delete(id: number) {
    return this.http.delete(`${baseURL}/${id}`);
  }

  // deleteAll() {
  //   return this.http.delete(baseURL);
  // }
}
