import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TruckTransactionUiResponse } from 'src/app/response/truck-transaction-ui-response';
import { catchError } from 'rxjs/operators';
import { SurveyImagesUiResponse } from 'src/app/response/survey-images-ui-response';
import { DamageInspectionImagesUiResponse } from 'src/app/response/damage-inspection-images-ui-response';
import { ApproveTransactionDto } from 'src/app/dto/inGateDto/approve-transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class OutGateService {
  baseUrl="http://localhost:9090"
  // public truckNumber:any;
  // http://localhost:9090/ingate/truck-transaction-details
   constructor(private http:HttpClient) { }
  // url="http://localhost:8080/ingate/truck" //table url
  
   fetchTableInfo(truckNumber:any):Observable<TruckTransactionUiResponse>{
     const url = this.baseUrl+"/ingate/truck-transaction-details/"+ truckNumber;
     return this.http.get<TruckTransactionUiResponse>(url).pipe(catchError(this.handleError));
   }
 
   fetchSurveyImages(truckNumber:any):Observable<SurveyImagesUiResponse>{
     const url = this.baseUrl+"/ingate/in-survey-images/"+ truckNumber;
     return this.http.get<SurveyImagesUiResponse>(url).pipe(catchError(this.handleError));
    }
 
    fetchDamageInspectionImages(truckNumber:any):Observable<DamageInspectionImagesUiResponse>{
     const url = this.baseUrl+"/ingate/damage-images/"+ truckNumber;
     return this.http.get<DamageInspectionImagesUiResponse>(url).pipe(catchError(this.handleError));
    }
   // http://localhost:9090/ingate/damage-images/KA04BJ1578
 
    
   sendApproveTransactionDetails( approveTransactionDto:ApproveTransactionDto): Observable<any> {
 
     const headers: HttpHeaders = new HttpHeaders({
       'Accept': 'application/json', 'Content-Type': 'application/json'
     });
     const url = this.baseUrl + '/ingate/approve';
     console.log(approveTransactionDto)
     return this.http.post<any>(url, approveTransactionDto, { headers}).pipe(catchError(this.handleError));
    //http://localhost:9090/ingate/approve
 
   }
 
   sendDataOnReject( rejectTransactionDto:ApproveTransactionDto):Observable<any>{
 
     const url = this.baseUrl + "/ingate/reject";
     return this.http.post<any>(url,rejectTransactionDto).pipe(catchError(this.handleError));
     //http://localhost:9090/ingate/reject
   }
 
 
   sendDataOnHold(holdTransactionDto:ApproveTransactionDto):Observable<any>{
 
     const url = this.baseUrl + "/ingate/reject";
     return this.http.post<any>(url,holdTransactionDto).pipe(catchError(this.handleError));
     //http://localhost:9090/ingate/reject
   }
 
 
 
   private handleError(error) {
     let errorMessage = '';
     errorMessage = `Error: ${error.error.message}`;
     window.alert(errorMessage);
     return throwError(errorMessage);
   }
   
}
