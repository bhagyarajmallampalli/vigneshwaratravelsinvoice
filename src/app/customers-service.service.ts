import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import { environment } from '../environments/environment';

@Injectable()
export class CustomersService {

  constructor(private http: Http) {}
  public getCustomers() {
    return this.http.get(environment.apiURI+'customers/getAllCustomers')
      .map(res => res.json());
  }
}
