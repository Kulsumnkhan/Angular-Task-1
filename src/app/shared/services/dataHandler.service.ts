import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class DataHandlerService{

    baseUrl = 'https://ea-19-task-1-default-rtdb.asia-southeast1.firebasedatabase.app/products.json';
    updateList : BehaviorSubject<any> = new BehaviorSubject('string')

    constructor( private http : HttpClient ){}

    addProductsList( res : any ){
        return this.http.post(this.baseUrl, res);
    }

    getProductsList(){
        return this.http.get(this.baseUrl, {
            headers : new HttpHeaders({
                "name" : "Kulsum"
            }),
            observe : 'body'
        }).pipe(map((jsonData : any) => {
            let arr = [];
            for(let data in jsonData){
                arr.push({...jsonData[data], id : data})
            }
            this.updateList.next(arr)
            return arr;
        }))
    }
}