import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExportTransactionRequestDto } from 'src/app/dto/export-mapping/export-transaction-request-dto';
import { ImportTransactionBestPickRequestDto } from 'src/app/dto/import-mapping/import-transaction-best-pick-request-dto';
import { EnvService } from 'src/app/env.service';
import { ExportDpdResponse } from 'src/app/response/export-mapping-response/export-dpd-response';
import { ImportTransactionUiApiResponse } from 'src/app/response/import-transaction-ui-api-response';
import { TruckTransactionUiApiResponse } from 'src/app/response/truck-transaction-ui-api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportTransactionMappingPageService {
 
  // url = "http://10.66.66.100:9080/sga-in-survey-repo/isp/export/validate"
 // baseUrl = environment.ApiUrl
  
  constructor(private http: HttpClient,public env: EnvService) { }
  baseUrl = this.env.apiUrl
  ValidateDetails(exportTransactionRequestDto: ExportDpdResponse): Observable<TruckTransactionUiApiResponse> {
    
    let jsonString = JSON.stringify(exportTransactionRequestDto);
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    const url = this.baseUrl + "/sga-in-survey-repo/isp/export/validate"
    return this.http.post<TruckTransactionUiApiResponse>(url, jsonString, { headers, responseType: 'json' }).pipe(catchError(this.handleError));
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
