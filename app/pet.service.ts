// Imports
import { Injectable }    from '@angular/core'; //imports Injectable to create its own injectable property in ln 11
import { Jsonp, URLSearchParams } from '@angular/http'; //BBWS project 
import { Pet } from './pet'; //model resides here
import 'rxjs/add/operator/map';//map method tries to map the method based on the method what pieces of data is needed.

/* @Injectable: tells Angular that this class is injectable as a
service to another class.
 */
@Injectable() //something that's injectable will be available with xx.injectable property
export class PetService {
  /* This class constructor also has JSONP injected. Note that
  // you don't have to inject JSONP as it is 'built into'
  // angular
  */
  constructor(private jsonp: Jsonp) {
    // by adding jsonp as an argument, we are
    // injecting JSONP as part of this service.
    // 'this.jsonp' becomes available. it is not written,
    // it is assumed.

  }
  // Base URL for Petfinder API
  private petsUrl = 'http://api.petfinder.com/';

  // Get a list if pets based on animal
  findPets(animal : string) {
    // End point for list of pets:
    // http://api.petfinder.com/pet.find?key=[API_KEY]&animal=[ANIMAL]&format=json&location=texas
    const endPoint = 'pet.find';
    /* URLSearchParams is an object that makes it easier to set query parameters and construct a URL rather than manually concatenating a string for URL, as done with the bestbuy project
     */

    let params = new URLSearchParams();
    params.set('key', '555f8155d42d5c9be4705beaf4cce089');
    params.set('location', 'ontario');
    params.set('animal', animal);
    params.set('format', 'json');//can also be sourced in xml--try!
    params.set('callback', 'JSONP_CALLBACK');
    // Return response. note it is similar to a promise
    /* the original return statement is broken down into
     * simpler steps . */
    let jsonp = this.jsonp;
    let request = jsonp.get(this.petsUrl + endPoint, { search: params });

    // this may need clarity.
    /* you are 'receiving' the response asynchronously
     * this is similar to the event handler of an xmlHTTPRequest
     * or the handler of a $.ajax() call in jquery
     *  */

    // ES5/6 hybrid
    let responseFn = function(response):Pet[]{
      let originalData = response.json();
      console.log(originalData); // returns an object like best buy
      let petFinderResults = originalData['petfinder']; // or .petfinder. its an object
      let petData = petFinderResults.pets;
      let refinedData:Pet[] = petData.pet; // like products from best buy
      return refinedData;
    };

    // ES6 long form
    let responseFn_2 = (response) => {
      let originalData = response.json();  //'as <Pet[]>' other way of stating
      // console.log(originalData); // returns an object like best buy
      let petFinderResults = originalData['petfinder']; // or .petfinder. its an object
      let petData = petFinderResults.pets;
      let refinedData:Pet[] = petData.pet; // like products from best buy
      console.log(refinedData);
      // the return statement shows an example of "casting"
      return <Pet[]> refinedData;//this method creates the map instead of giving the location in one line.
    };

    // ES6 short form
    // let responseFn = (response) => (<Pet[]> response.json().petfinder.pets.pet); --follow the bouncing ball.  The data is
    //cast as an array of pet objects.  Force the data to become an array--parse it through a filter.

    let processRequest = request.map(responseFn_2); //map the data out.  The function makes the data understandable.
    return processRequest;
  }

  findPetById(id: string){//pairs original file with name to the search bar line 33 in cat-details.components.ts
    // End point for list of pets:
    // http://api.petfinder.com/pet.find?key=[API_KEY]&animal=[ANIMAL]&format=json&location=texas
    const endPoint = 'pet.get'
    // URLSearchParams makes it easier to set query parameters and construct URL
    // rather than manually concatinatng
    let params = new URLSearchParams();
    params.set('key', '555f8155d42d5c9be4705beaf4cce089');
    params.set('id', id);
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    console.log(id);
    // Return response
   return this.jsonp
              .get(this.petsUrl + endPoint, { search: params })
              .map(response => {

                console.log(response.json().petfinder.pet);
                return  response.json().petfinder.pet
              });
  }
}
