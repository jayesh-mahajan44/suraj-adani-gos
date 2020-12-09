import { ApproveTransactionDto } from 'src/app/dto/inGateDto/approve-transaction-dto';
import { ApiResponse } from '../api-response';

export class ApproveTransactionResponse extends ApiResponse{

    approveTransactionDto:ApproveTransactionDto;
}
