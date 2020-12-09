import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { ImportTransactionValidationUiDto } from "src/app/dto/import-transaction-validation-ui-dto";
import { catchError } from "rxjs/operators";
import { ImportTransactionUiApiResponse } from "src/app/response/import-transaction-ui-api-response";
import { ImportDpdRequest } from 'src/app/request/import-dpd-request';
import { ImportTransactionBestPickRequestDto } from 'src/app/dto/import-mapping/import-transaction-best-pick-request-dto';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';

@Injectable(
    {
        providedIn: 'root'
    })
export class ImportTransactionMappingService {

    // baseUrl = "http://10.66.66.100:9080/sga-in-survey-repo/isp/import/validate/";
   // baseUrl = environment.ApiUrl
    
    constructor(private http: HttpClient, public env: EnvService) {
    }
    baseUrl = this.env.apiUrl
    DpdValidateDetails(importTransactionUiDto: ImportDpdRequest): Observable<any> {
        let jsonString = JSON.stringify(importTransactionUiDto);
        const url = this.baseUrl + "/sga-in-survey-repo/isp/import/validate/dpd"
        const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<ImportTransactionUiApiResponse>(url, jsonString, { headers, responseType: 'json' }).pipe(catchError(this.handleError));
    }

    bestPickValidateDetails(importTransactionUiDto: ImportTransactionBestPickRequestDto): Observable<ImportTransactionUiApiResponse> {
        const url = this.baseUrl + "/sga-in-survey-repo/isp/import/validate/bestPick"
        // let jsonString = JSON.stringify(importTransactionUiDto);
        // const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<ImportTransactionUiApiResponse>(url,importTransactionUiDto).pipe(catchError(this.handleError));
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