import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class VehicleService {

  constructor(private http: Http) {}

  public getVehicles() {
    return this.http.get(environment.apiURI+'vehicles/getAllVehicles')
      .map(res => res.json());  
  }

}
