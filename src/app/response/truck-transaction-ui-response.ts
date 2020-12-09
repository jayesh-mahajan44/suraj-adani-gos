
import { ApiResponse } from './api-response';
import { TruckTransactionUiDtos } from '../dto/inGateDto/truck-transaction-ui-dtos';


export class TruckTransactionUiResponse extends ApiResponse{
    truckTransactionResponseDto:TruckTransactionUiDtos;
}
