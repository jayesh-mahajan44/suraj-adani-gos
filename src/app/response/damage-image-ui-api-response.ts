import { ApiResponse } from './api-response';
import { DamageImageUiDto } from '../dto/damagesDto/damage-image-ui-dto';

export class DamageImageUiApiResponse  extends ApiResponse {
    damageImageDtos:DamageImageUiDto[];
}
