import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private baseURL = 'http://localhost:8080/api/v1/persona';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseURL);
  }

  getById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseURL}/${id}`);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseURL}/create`, persona);
  }

  update(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.baseURL}/update/${id}`, persona);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/delete/${id}`);
  }
}
