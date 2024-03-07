import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { version } from '../../environments/version';

interface OPTIONS {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    // responseType: "arraybuffer";
    withCredentials?: boolean;
}


@Injectable()
export class ApiService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private storage: StorageMap,
        private tokenService: TokenService
    ) { }
    handleResponse(ret, observer) {
        if (ret) {

            observer.next(ret);

        } else {
            console.log("Error from API Serv: ", ret);

            //if error 500, and message contain token expired, 
            //then redirect to login page
            if (ret.error && ret.error.message && ret.error.message.indexOf('token expired') > -1) {
                this.handleTokenExpired();
                return;
            }
            if (ret.statusCode == 400 && ret.message == "User already has level 2 input") {
                let url = '/setup/proof-of-address';
                this.router.navigate([url]);
            }
            observer.error(ret.error);
        }
    }

    handleTokenExpired() {
        this.tokenService.deleteToken();
        window.location.href = '/login';
    }

    getOptions(isFile: boolean = false) {
        //log getOptions isFile: ", isFile
        // console.log("getOptions isFile: ", isFile);


        const ret = new Observable<any>((subscriber: any) => {
            const token = this.tokenService.getToken();
            if (!token) {
                subscriber.error({ error: 'token not existed' });
            }
            const httpHeaders = isFile ?
                new HttpHeaders({
                    'x-access-token': token,
                    'X-App-Version': version,
                })
                : new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'X-App-Version': version,
                });
            const options = {
                headers: httpHeaders
            };
            return subscriber.next(options);


        });
        return ret;
    }

    postPublic(uri: string, data: any) {
        const ret = new Observable<any>((observer) => {
            this.http.post<any>(environment.API + uri, data).subscribe(
                (ret: any) => {
                    this.handleResponse(ret, observer);
                },
                (err: any) => {
                    observer.error(err.error);
                }
            );
        });
        return ret;
        //return this.post<any>(environment.API + uri, data);
    }

    getPublic(uri: string) {
        const ret = new Observable<any>((observer) => {
            this.http.get<any>(environment.API + uri).subscribe(
                (ret: any) => {
                    this.handleResponse(ret, observer);
                },
                (err: any) => {
                    observer.error(err.error);
                }
            );
        });
        return ret;
    }

    getPrivate(uri: string) {

        const ret = new Observable<any>((observer) => {
            this.getOptions().subscribe(options => {
                this.http.get<any>(environment.API + uri, options).subscribe(
                    (ret: any) => {
                        this.handleResponse(ret, observer);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }

    deletePrivate(uri: string, data: any = null) {

        const ret = new Observable<any>((observer) => {
            this.getOptions().subscribe(options => {

                if (data) {
                    options['body'] = data;
                }
                this.http.delete<any>(environment.API + uri, options).subscribe(
                    (ret: any) => {
                        this.handleResponse(ret, observer);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }

    postPrivate(uri: string, data: any) {

        const ret = new Observable<any>((observer) => {
            this.getOptions().subscribe(options => {
                this.http.post<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        this.handleResponse(ret, observer);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }


    postPrivateFormData(uri: string, data: any) {
        const ret = new Observable<any>((observer) => {
            this.getOptions().subscribe(options => {
                this.http.post<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        observer.next(ret);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }

    putPrivate(uri: string, data: any = null) {
        const ret = new Observable<any>((observer) => {
            this.getOptions().subscribe(options => {
                this.http.put<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        this.handleResponse(ret, observer);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }


    putPrivateFile(uri: string, data: any) {
        const ret = new Observable<any>((observer) => {
            this.getOptions(true).subscribe(options => {
                this.http.put<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        this.handleResponse(ret, observer);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            });
        });
        return ret;
    }
}