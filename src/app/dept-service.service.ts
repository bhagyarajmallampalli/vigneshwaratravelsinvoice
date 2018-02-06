import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import { environment } from '../environments/environment';

@Injectable()
export class DeptService {

  constructor(private http: Http) {}
  public getDepts() {
    return this.http.get(environment.apiURI+'depts/getAllDepts')
      .map(res => res.json());
  }

}
