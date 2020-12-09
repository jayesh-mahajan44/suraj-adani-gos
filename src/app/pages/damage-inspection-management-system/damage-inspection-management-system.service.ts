import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DamageImageUiDto } from 'src/app/dto/damagesDto/damage-image-ui-dto';
import { DamageImageUiApiResponse } from 'src/app/response/damage-image-ui-api-response';
import { DamageInspectionImagesUiResponse } from 'src/app/response/damage-inspection-images-ui-response';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root'
})
export class DamageInspectionManagementSystemService {

  constructor(private http: HttpClient, public env: EnvService) { }
  baseUrl = this.env.apiUrl;
  fetchDamageInspectionImagesData(truckNumber: any): Observable<DamageImageUiApiResponse> {

    const url = this.baseUrl + "/sga-ingate-repo/sga/fetch/" + truckNumber;
    return this.http.get<DamageImageUiApiResponse>(url).pipe(catchError(this.handleError));

  }

  toSendDamageImagesDetails(damageImageDtoList: DamageImageUiDto[]): Observable<any> {

    // let jsonString2= JSON.stringify(damagedato2)
    const url = this.baseUrl + "/sga-ingate-repo/sga/imageList"
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json', 'Content-Type': 'application/json', 'X-COM-PERSIST': 'true',
      'X-COM-LOCATION': 'false'
    });

    return this.http.post<any>(url, damageImageDtoList, { headers, responseType: 'json' });
  }

  private handleError(error) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

};