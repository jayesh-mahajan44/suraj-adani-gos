import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Driver } from 'src/app/dto/driver';
import { DriverUiApiResponse } from '../../response/driver-ui-api-response';

@Injectable({
  providedIn: 'root'
})
export class DriverMasterService {
  //url = "http://192.168.1.88:9080/sga-ui-registration-service/ui/reg/v1/drivers";//"http://localhost:9081/ui/reg/v1/drivers"
  url = "http://localhost:9080/sga-registration-facade-service/ui/reg/v1/drivers";
//  url = "http://localhost:9081/ui/reg/v1/drivers";
  constructor(private http: HttpClient) {

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
  getAllDrivers(): Observable<any> {
    return this.http.get<DriverUiApiResponse>(this.url, { responseType: 'json' }).pipe(catchError(this.handleError));

  }
  getByDriverLicenseNumber(licenseNumber: string): Observable<any> {
    return this.http.get<DriverUiApiResponse>(this.url + "/licenseNumber/"+licenseNumber, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  getImageAgainstDriverId(driverId: number): Observable<any> {
    return this.http.get<DriverUiApiResponse>(this.url + "/licenseImage/" + driverId, { responseType: 'json' }).pipe(catchError(this.handleError));

  }
  deleteDriverById(id: number): Observable<any> {
    return this.http.post<DriverUiApiResponse>(this.url+"/delete/" + id, null).pipe(catchError(this.handleError));
  }

  addDriver(driver: Driver): Observable<any> {
    return this.http.post<DriverUiApiResponse>(this.url, driver, { responseType: 'json' }).pipe(catchError(this.handleError));

  }

  addDriverWithImage(formData: FormData): Observable<any> {
    return this.http.post<DriverUiApiResponse>(this.url, formData, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
  updateDriver(driver: Driver): Observable<any> {
    return this.http.post<DriverUiApiResponse>(this.url + "/update", driver, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
  updateDriverWithImage(formData: FormData): Observable<any> {
    return this.http.post<DriverUiApiResponse>(this.url + "/update", formData, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
}