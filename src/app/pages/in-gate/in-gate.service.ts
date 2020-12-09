import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DamageInspectionImagesUiResponse } from 'src/app/response/damage-inspection-images-ui-response';
import { SurveyImagesUiResponse } from 'src/app/response/survey-images-ui-response';
import { TruckTransactionUiResponse } from 'src/app/response/truck-transaction-ui-response';
import { ApproveTransactionDto } from 'src/app/dto/inGateDto/approve-transaction-dto';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root'
})
export class InGateService {

    //baseUrl = environment.ApiUrl
  constructor(private http: HttpClient,public env: EnvService) { }
  baseUrl = this.env.apiUrl
  fetchTableInfo(truckNumber: any): Observable<TruckTransactionUiResponse> {

    const url = this.baseUrl + "/sga-ingate-repo/ingate/truck-transaction-details/" + truckNumber;
    return this.http.get<TruckTransactionUiResponse>(url).pipe(catchError(this.handleError));

  }

  fetchSurveyImages(truckNumber: any): Observable<SurveyImagesUiResponse> {

    const url = this.baseUrl + "/sga-ingate-repo/ingate/in-survey-images/" + truckNumber;
    return this.http.get<SurveyImagesUiResponse>(url).pipe(catchError(this.handleError));

  }

  fetchDamageInspectionImages(truckNumber: any): Observable<DamageInspectionImagesUiResponse> {

    const url = this.baseUrl + "/sga-ingate-repo/ingate/damage-images/" + truckNumber;
    return this.http.get<DamageInspectionImagesUiResponse>(url).pipe(catchError(this.handleError));

  }
  // http://localhost:9090/ingate/damage-images/KA04BJ1578


  sendApproveTransactionDetails(approveTransactionDto: ApproveTransactionDto): Observable<any> {

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json', 'Content-Type': 'application/json'
    });
    const url = this.baseUrl + '/sga-ingate-repo/ingate/approve';
    console.log(approveTransactionDto)
    return this.http.post<any>(url, approveTransactionDto).pipe(catchError(this.handleError));
//http://10.66.66.100:9080/sga-ingate-repo/ingate/approve
  }

  sendDataOnReject(rejectTransactionDto: ApproveTransactionDto): Observable<any> {

    const url = this.baseUrl + "/sga-ingate-repo/ingate/reject";
    return this.http.post<any>(url, rejectTransactionDto).pipe(catchError(this.handleError));


  }


  sendDataOnHold(holdTransactionDto: ApproveTransactionDto): Observable<any> {

    const url = this.baseUrl + "/sga-ingate-repo/ingate/reject";
    return this.http.post<any>(url, holdTransactionDto).pipe(catchError(this.handleError));

  }



  private handleError(error) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
