import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { tokenGetter } from './app.module';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addAuthToken(request);
    const started = Date.now();
    let ok: string;
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    // const cachedResponse = this.cache.get(request.url);
    // if (cachedResponse) {
    //   return of(cachedResponse);
    // }

    return next.handle(request).pipe(
      tap((response) => {
        // if (response instanceof HttpResponse) {
        //   this.cache.set(request.url, response);
        // }
      })
    );
  }
  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('')
    return request.clone({
      setHeaders: {
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NzAzMjM4OTUxIiwiVXNlcklkIjoiNCIsIlVzZXJOYW1lIjoic3VtYW50aGl0aGEiLCJSb2xlIjoiIiwiZXhwIjoxNjUzMjkyOTE2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0NCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzQ0In0.k2pjwT95fcdnzp2-VHelNeQG2_DbI4Pj4sT3635jpBI`,
        Authorization: `Bearer ${tokenGetter()}`,
      },
    });
  }
}
