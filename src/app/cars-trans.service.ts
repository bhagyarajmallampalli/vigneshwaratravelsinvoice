import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import { environment } from '../environments/environment';

@Injectable()
export class CarsTransService {

  headers: Headers;
    public options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers();
  //  this.headers.append("Content-Type", "application/json");
 //   this.headers.append("Access-Control-Allow-Origin","*");
   // this.options.headers = this.headers;
  }
  
  public getInvoiceNumber(){
    return this.http.get(environment.apiURI+'carstransactions/nextInvoiceNumber')
      .map(res => res.json());
  }
  public insertCarsTrans(param: any): Observable<any> {
 
  let body = param;
  console.log("param::"+param);
  return this.http
      .post(environment.apiURI+'carstransactions/insert', body, {
      headers: this.headers
      })
      .map(this.extractData)
      .catch(this.handleError);
  }   

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}
