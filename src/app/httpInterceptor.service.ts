import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as alertify from 'alertifyjs';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private ngxService: NgxUiLoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isUserSignedin() && this.authService.getToken()) {
            const request = req.clone({
                headers: new HttpHeaders({
                    //   'content-type': 'application/json; charset=utf-8',
                    'Authorization': this.authService.getToken()
                })
            });
            return next.handle(request).pipe(
                catchError(err => {
                    if (err instanceof HttpErrorResponse && err.status === 500) {
                        this.ngxService.stop();
                        alertify.error("Internal Server Error ttttt");
                    }
                    //console.log("kiran"+JSON.stringify(err))
                    else if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.authService.signout();
                        alertify.error("Internal Server Error");
                    }
                    return throwError(err);
                })
            );
        }

        return next.handle(req);
    }


}