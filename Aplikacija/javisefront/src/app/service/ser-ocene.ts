import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocena } from '../interface/ocena';

@Injectable({providedIn: "root"})
export class ServiceOcenaKontakt {
    constructor(private http: HttpClient ){}

    addOcenaKontakt(id:String){
        this.http.post("http://localhost:3000/ocena/",{majstorId:id}).subscribe(x=>{
            console.log(x);
            alert("Ocena dodata");
        },error=>{
            alert("Kontakt je vec dodat");
        });
    }
    getOcena():Observable<{ocene:Ocena[]}>{
        return this.http.get<{ocene:Ocena[]}>("http://localhost:3000/ocena/");
    }
    putOcena(id:string,ocena:number){
        return this.http.put("http://localhost:3000/ocena",{majstorId:id,ocena:ocena}).subscribe(x=>{
            console.log(x);
        })
    }
    getChats():Observable<{chats:Ocena[]}>{
        return this.http.get<{chats:Ocena[]}>("http://localhost:3000/ocena/chats");
    }
}