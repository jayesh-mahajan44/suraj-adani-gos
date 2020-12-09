import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Truck } from 'src/app/dto/truck';
import { TruckUiApiResponse } from '../../response/truck-ui-api-response';

@Injectable({
  providedIn: 'root'
})
export class TruckMasterService {
  // url = "http://192.168.1.88:9080/sga-ui-registration-service/ui/reg/v1/trucks"
  url = "http://localhost:9080/sga-registration-facade-service/ui/reg/v1/trucks"
//  url = "http://localhost:9081/ui/reg/v1/trucks"    
  constructor(private http: HttpClient) {

  }

  private handleError(error) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getAllTrucks(): Observable<any> {
    return this.http.get<TruckUiApiResponse>(this.url, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  getByTruckRegNumber(): Observable<any> {
    return this.http.get<TruckUiApiResponse>(this.url + "/findByTruckRegNumber", { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  addTruck(truckModel: Truck): Observable<any> {
    return this.http.post<TruckUiApiResponse>(this.url, truckModel, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  updateTruck(truckModel: Truck): Observable<any> {
    return this.http.post<TruckUiApiResponse>(this.url + "/update", truckModel, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  deleteTruckById(truckId: number): Observable<any> {
    return this.http.post<TruckUiApiResponse>(this.url + "/softDelete/" + truckId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
}