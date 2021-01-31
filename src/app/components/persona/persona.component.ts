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
  apellido: string;
  personaSelected: Persona 

  constructor(private personaService: PersonaService) {
    this.personas = []
    this.apellido = "";
    this.personaSelected = new Persona();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getPersona() {
    if(this.apellido.length > 0) {
      this.getByApellido();
    } else {
      this.getAll();
    }
    this.apellido = "";
  }

  getAll() {
    this.personaService.getAll().subscribe(data => {
      this.personas = [];
      this.personas = data;
    });
  }

  getByApellido() {
    this.personaService.getByApellido(this.apellido).subscribe(data => {
      this.personas = [];
      this.personas.push(data);
    });
  }

  createOrUpdate() {
    let id = this.personaSelected.id;
    if(id != null && id > 0) {
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
