import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Oglas } from '../interface/oglas';
import { response } from 'express';
import { Majstor } from '../interface/majstor';

@Injectable({providedIn: "root"})
export class ServiceOglas {
    constructor(private http: HttpClient ){}

    postOglas(oglas: FormData): Observable<any> {
        return this.http.post('http://localhost:3000/post', oglas);
    }

    getOglasi(url:string): Observable<{message:string, post:Oglas[]}>  {
        return this.http.get<{message:string, post:Oglas[]}>(url)
        .pipe(
            map(response => {
                return {message:response.message, post:response.post};
            })
        )
    }

    deleteOglas(id: string) {
        this.http.delete("http://localhost:3000/post/" + id)
        .subscribe(x => {
            console.log(x)
        })
    }
    getOglas(id:string):Observable<{post:Oglas,majstor:Majstor, prosek: number}>{
        return this.http.get<{post:Oglas,majstor:Majstor,prosek:number}>("http://localhost:3000/post/"+id);
    }
    editOglas(form: FormData): Observable<any> {
        return this.http.put("http://localhost:3000/post", form);
    }
}