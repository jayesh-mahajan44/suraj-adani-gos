import { ExportTransactionRequestDto } from 'src/app/dto/export-mapping/export-transaction-request-dto';
import { ApiResponse } from '../api-response';

export class ExportDpdResponse extends ApiResponse {

    exportDpdRequestDtos:ExportTransactionRequestDto[] = []
    truckId:number;
}
