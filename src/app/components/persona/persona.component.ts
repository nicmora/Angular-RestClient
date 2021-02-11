import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  personas: Persona[];
  personaForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni: new FormControl(''),
    fechaNacimiento: new FormControl('')
  });

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getPersona(id: number): void {
    if (id) {
      this.getById(id);
    } else {
      this.getAll();
    }
  }

  getAll(): void {
    this.personaService.getAll().subscribe(
      (response: Persona[]) => {
        this.personas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  getById(id: number): void {
    this.personaService.getById(id).subscribe(
      (response: Persona) => {
        this.personas = [];
        this.personas.push(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  onSelectPersona(persona: Persona): void {
    this.personaForm = new FormGroup({
      id: new FormControl(persona.id),
      nombre: new FormControl(persona.nombre),
      apellido: new FormControl(persona.apellido),
      dni: new FormControl(persona.dni),
      fechaNacimiento: new FormControl(persona.fechaNacimiento)
    });
  }

  onCreate(): void {
    document.getElementById('createCloseBtn').click();
    let persona = this.personaForm.value;
    this.personaService.create(persona).subscribe(
      (response: Persona) => {
        this.getAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  onUpdate(): void {
    document.getElementById('updateCloseBtn').click();
    let persona = this.personaForm.value;
    this.personaService.update(persona.id, persona).subscribe(
      (response: Persona) => {
        this.getAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  onDelete(): void {
    document.getElementById('deleteCloseBtn').click();
    let id = this.personaForm.value.id;
    this.personaService.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
