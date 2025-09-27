import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Message } from '../interface/message';

@Injectable({providedIn: "root"})
export class ServiceMessage{
    constructor(private http: HttpClient ){}
    private subject=new Subject<Message[]>();
    returnObs():Observable<Message[]>{
        return this.subject.asObservable();
    }
    getMessages(id:String){
        this.http.get<{messages:Message[]}>("http://localhost:3000/message/"+id).subscribe(x=>{
            this.subject.next(x.messages);
        });
    }
}