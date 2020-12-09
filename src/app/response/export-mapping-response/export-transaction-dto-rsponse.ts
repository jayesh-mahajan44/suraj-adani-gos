import { ExportTransactionUiDto } from 'src/app/dto/export-transaction-ui-dto';
import { ApiResponse } from '../api-response';

export class ExportTransactionDtoRsponse extends ApiResponse {

    exportTransactionDto:ExportTransactionUiDto;
}
