// Import component decorator
import { Component, OnInit } from '@angular/core';

import { PetService } from '../pet.service'

import { Observable } from 'rxjs/Observable';

import { Pet } from '../pet';

@Component({
  template: `
    <h2>Cats</h2>
    <p>List of cats</p>
    <ul class="demo-list-icon mdl-list">
      <li class="mdl-list__item" *ngFor="let cat of cats | async">
        <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">pets</i>
            <a [routerLink]="['/cats', cat.id.$t]">{{cat.name.$t}}</a>// $t is the property inside the name that gives you the value.
        </span>
      </li>
    </ul>
    `
})
// Component class
export class CatListComponent implements OnInit {

  cats: Observable<Pet[]>;
  constructor(private petService: PetService) {

  }

  ngOnInit() {
    this.cats = this.petService.findPets('cat'); //cat-detail.components = petService to findPets being 'cat'.
  }

}
