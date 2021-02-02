import { Component, OnInit } from '@angular/core';

import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  personas: Persona[];
  id: number;
  personaSelected: Persona;

  constructor(private personaService: PersonaService) {
    this.personas = [];
    this.id = null;
    this.personaSelected = new Persona();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getPersona() {
    if (this.id != null) {
      this.getById();
    } else {
      this.getAll();
    }
  }

  getAll() {
    this.personaService.getAll().subscribe((data) => {
      this.personas = [];
      this.personas = data;
    });
  }

  getById() {
    this.personaService.getById(this.id).subscribe((data) => {
      this.personas = [];
      this.personas.push(data);
      this.id = null;
    });
  }

  loadForm(persona: Persona) {
    this.personaSelected.id = persona.id;
    this.personaSelected.nombre = persona.nombre;
    this.personaSelected.apellido = persona.apellido;
    this.personaSelected.dni = persona.dni;
    this.personaSelected.fechaNacimiento = persona.fechaNacimiento;
  }

  createOrUpdate() {
    let id = this.personaSelected.id;
    if (id != null && id > 0) {
      this.personaService.update(id, this.personaSelected).subscribe(() => {
        this.getAll();
        this.personaSelected = new Persona();
      });
    } else {
      this.personaService.create(this.personaSelected).subscribe(() => {
        this.getAll();
        this.personaSelected = new Persona();
      });
    }
  }

  delete(id: number) {
    this.personaService.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
