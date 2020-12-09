import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { CaptureImageDto } from 'src/app/dto/capture-image-dto';
import { ExportImageDto } from 'src/app/dto/export-mapping/export-image-dto';
import { EnvService } from 'src/app/env.service';
import { ExportImageDtoRequest } from 'src/app/request/export-image-dto-request';
import { ApiResponse } from 'src/app/response/api-response';
import { ExportTransactionDtoRsponse } from 'src/app/response/export-mapping-response/export-transaction-dto-rsponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageCaptureServiceService {

  // baseUrl = environment.ApiUrl
 
  // url = "http://10.66.66.100:9080/sga-in-survey-repo/isp/export/saveImage"

  constructor(private http: HttpClient,public env: EnvService) { }
  baseUrl = this.env.apiUrl
  exportCaptureImages(exportImageDto: ExportImageDtoRequest): Observable<ApiResponse> {
    
    const url = this.baseUrl + "/sga-in-survey-repo/isp/export/saveImage"
    // let jsonString = JSON.stringify(exportImageDto);
    // const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse>(url,exportImageDto).pipe(catchError(this.handleError));
}
validDropDownData(id:number): Observable<ExportTransactionDtoRsponse> {
    
  // let jsonString = JSON.stringify(exportImageDto);
  // const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  const url = this.baseUrl + "/sga-export-transaction-data-service/export/"  + id
  return this.http.get<ExportTransactionDtoRsponse>( url ).pipe(catchError(this.handleError));
}

private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
}



}
