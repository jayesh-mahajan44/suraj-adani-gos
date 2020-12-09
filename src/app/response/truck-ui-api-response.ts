import { ApiResponse } from './api-response'
// import { Truck } from '../dto/truck';
import { TruckUiDto } from '../dto/truck-ui-dto';
export class TruckUiApiResponse extends ApiResponse {
    truckUiDto: TruckUiDto;
    listOfTruckUiDto: TruckUiDto[];
}