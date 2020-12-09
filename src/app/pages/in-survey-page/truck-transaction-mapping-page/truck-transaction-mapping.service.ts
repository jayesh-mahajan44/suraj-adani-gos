import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { TruckUiApiResponse } from '../../../response/truck-ui-api-response';
import { TruckTransactionUiApiResponse } from 'src/app/response/truck-transaction-ui-api-response';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';


@Injectable({
  providedIn: 'root'
})
export class TruckTransactionMappingService {
  
  constructor(private http: HttpClient,public env: EnvService) { }

 // baseUrl = environment.ApiUrl + "/sga-in-survey-repo/isp/transaction";
  baseUrl = this.env.apiUrl + "/sga-in-survey-repo/isp/transaction";
  validateTruckByBatNoAndCreateTruckTransaction(batNo:string): Observable<TruckTransactionUiApiResponse> {
    return this.http.post<TruckTransactionUiApiResponse>(this.baseUrl+"/batno/"+ batNo, { responseType: 'json' }).pipe(catchError(this.handleError));
  
  }
  validateTruckByTruckRegistrationNoAndCreateTruckTransaction(truckRegNo:string): Observable<TruckTransactionUiApiResponse> {
    let value 
    return this.http.post<TruckTransactionUiApiResponse>(this.baseUrl + "/regno/" + truckRegNo, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
  private handleError(error) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
