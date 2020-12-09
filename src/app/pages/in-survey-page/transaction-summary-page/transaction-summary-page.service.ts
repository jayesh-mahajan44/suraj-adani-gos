import { Observable, throwError } from 'rxjs';
// import { url } from 'inspector';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TruckTransactionUiDto } from 'src/app/dto/truck-transaction-ui-dto';
import { ImportTransactionValidationUiDto } from 'src/app/dto/import-transaction-validation-ui-dto';
import { ExportTransactionUiDto } from 'src/app/dto/export-transaction-ui-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TruckTransactionUiApiResponse } from 'src/app/response/truck-transaction-ui-api-response';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionSummaryPageService {

  // baseUrl = environment.ApiUrl
  truckTranactionDto: TruckTransactionUiDto
  constructor(private http: HttpClient, public env: EnvService) { }
  baseUrl = this.env.apiUrl

  submitSumaaryPageValidta(truckTransactionId: number): Observable<any> {
    let url = this.baseUrl + "/sga-in-survey-repo/isp/transaction/submit/" + truckTransactionId
    return this.http.get<any>(url).pipe(catchError(this.handleError));

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
