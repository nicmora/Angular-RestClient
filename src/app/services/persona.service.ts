import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private baseURL = 'http://localhost:8080/api/v1/persona';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Persona[]>(this.baseURL);
  }

  getById(id: number) {
    return this.http.get<Persona>(`${this.baseURL}/${id}`);
  }

  create(persona: Persona) {
    return this.http.post<Persona>(this.baseURL, persona);
  }

  update(id: number, persona: Persona) {
    return this.http.put<Persona>(`${this.baseURL}/${id}`, persona);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
