import { TruckTransactionUiDto } from "../dto/truck-transaction-ui-dto";
import { ApiResponse } from "./api-response";

export class TruckTransactionUiApiResponse extends ApiResponse {
	truckTransactionUiDto:TruckTransactionUiDto;
    // truckTransactionUiDtos:TruckTransactionUiDto[];
}