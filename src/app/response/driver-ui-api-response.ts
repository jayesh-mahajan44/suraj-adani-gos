import { ApiResponse } from './api-response'
import { DriverUiDto } from '../dto/driver-ui-dto';
export class DriverUiApiResponse extends ApiResponse {
    driverUiDto: DriverUiDto;
    listOfDriverUiDto: DriverUiDto[]
    
}