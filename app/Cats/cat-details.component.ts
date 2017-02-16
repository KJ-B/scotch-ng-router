// Imports
import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service'
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div *ngIf="cat">
        <h2>{{cat.name.$t}}</h2>
        <img src="{{cat.media.photos.photo[3].$t}}"/>
        <p><strong>Age: </strong>{{cat.age.$t}}</p>
        <p><strong>Sex: </strong>{{cat.sex.$t}}</p>
        <p><strong>Description: </strong>{{cat.description.$t}}</p>
    </div>
    `,
    
})
// Component class implementing OnInit
export class CatDetailsComponent implements OnInit {
  // Private properties for binding
  private sub:any;  //var fred (i.e "anything")
  private cat:string[];

  constructor(private petService: PetService, private route: ActivatedRoute) {

  }

  // Load data ones componet is ready
  ngOnInit() {
      // Subscribe to route params
      this.sub = this.route.params.subscribe(params => {//enables to read the info in the address bar
        let id = params['id'];//this the list that you want to look for. id pairs the search name with the address bar. line82 cat-list.component.ts
       // Retrieve Pet with Id route param
        this.petService.findPetById(id).subscribe(cat => this.cat = cat);
    });
  }

  ngOnDestroy() {
      // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }
}