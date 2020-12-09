import { ApiResponse } from './api-response';
import { DamageInspectionImagesUiDto } from '../dto/inGateDto/damage-inspection-images-ui-dto';

export class DamageInspectionImagesUiResponse extends ApiResponse {
    damageInspectionImageDtos:DamageInspectionImagesUiDto[];
}

