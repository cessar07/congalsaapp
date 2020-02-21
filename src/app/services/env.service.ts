import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
	API_URL = 'http://depruebas.club/congalsaback/public';
	//API_URL = 'http://localhost/congalsaback/public';
  	constructor() { }
}
