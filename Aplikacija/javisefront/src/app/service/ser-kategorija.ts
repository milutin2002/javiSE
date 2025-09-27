import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Kategorija } from '../interface/kategorija';

@Injectable({providedIn: "root"})
export class ServiceKategorija {
    constructor(private http: HttpClient ){}
    private subject = new Subject<Kategorija[]>();

    vratiOb(): Observable<Kategorija[]> {
        return this.subject.asObservable();
    }

    getKategorije() {
        this.http.get<{kategorije: Kategorija[]}>('http://localhost:3000/kategorije')
        .subscribe(x=>{
            console.log(x);
            this.subject.next(x.kategorije);
        });
    }
}