import { TruckUiApiResponse } from "src/app/response/truck-ui-api-response";
import { Observable, throwError } from "rxjs";
import { TruckUiDto } from "src/app/dto/truck-ui-dto";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable(
  {
    providedIn: "root"
  })
export class TruckDriverMappingPageService {
  url = "http://localhost:9080/sga-registration-facade-service/ui/reg/v1/mapping";
  constructor(private http: HttpClient) {

  }
  validateTruckForDriverMapping(regNumber: String): Observable<any> {
    return this.http.get<TruckUiApiResponse>(this.url + "/regNum/" + regNumber, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  mapDriverToTruck(truckUiDto: TruckUiDto): Observable<any> {
    return this.http.post<TruckUiApiResponse>(this.url + "/driver", truckUiDto, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  private handleError(error) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}