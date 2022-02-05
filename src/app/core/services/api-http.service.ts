// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient
  ) { }
  public get(url: string, options?: any) {
    url = environment.apiUrl+url;
    return this.http.get(url, options);
  }
  public post(url: string, data: any, options?: any) {
    url = environment.apiUrl+url;
    return this.http.post(url, data, options);
  }
  public put(url: string, data: any, options?: any) {
    url = environment.apiUrl+url;
    return this.http.put(url, data, options);
  }
  public delete(url: string, options?: any) {
    url = environment.apiUrl+url;
    return this.http.delete(url, options);
  }
}
