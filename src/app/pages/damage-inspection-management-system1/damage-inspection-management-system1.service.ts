import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DamageImageUiDto } from 'src/app/dto/damagesDto/damage-image-ui-dto';
import { DamageImageRequest } from 'src/app/request/damage-image-request';
import { DamageImageUiApiResponse } from 'src/app/response/damage-image-ui-api-response';


@Injectable({
  providedIn: 'root'
})
export class DamageInspectionManagementSystem1Service {

  constructor(private http:HttpClient) { }
  
  
//   getData(): Observable<DamageImageUiDto> {
//     const url="/assets/DIMS.json";
//     return this.http.get<DamageImageUiDto>(url).pipe(map(data => data));
// }

getData(): Observable<DamageImageUiDto> {
  const url = "http://localhost:8080/sga/fetch";
//  const url="/assets/DIMS.json";
 // return this.http.get<DamageImageUiDto>(url).pipe(map(data => data));
  return this.http.get<DamageImageUiDto>(url);
}

sendData1(damageImageDtoTop:DamageImageRequest):Observable<any>{
  let jsonString = JSON.stringify(damageImageDtoTop);
 // let jsonString2= JSON.stringify(damagedato2)
  const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  const url="/assets/DIMS.json";
  return this.http.post<any>(url,jsonString,{ headers, responseType: 'json' });
}

sendData2(damageImageDtoBack:DamageImageRequest):Observable<any>{
  let jsonString = JSON.stringify(damageImageDtoBack);
 // let jsonString2= JSON.stringify(damagedato2)
  const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  const url="http://localhost:8080/sga/image ";
  return this.http.post<any>(url,jsonString,{ headers, responseType: 'json' });
}


}

// Observable<any> {
//   let jsonString = JSON.stringify(importTransactionUiDto);
//   const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
//   return this.http.post<ImportTransactionUiApiResponse>(this.url, jsonString, { headers, responseType: 'json' }).pipe(catchError(this.handleError));
// }


// fetchInfo():Observable<any>{
//   const url="/assets/DIMS.json";
//   return this.http.get<DamageImagesDtos>(url).pipe(map(data => {
//     const imagesArray=[];
//     for(const key in data){
//       imagesArray.push({damageDtos:key,imagsDto:key,...data[key],...data[key]})
//     }
//     return imagesArray
//   }))

