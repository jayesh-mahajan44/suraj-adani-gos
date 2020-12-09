import { SurveyImagesUiDto } from '../dto/inGateDto/survey-images-ui-dto';
import { expand } from 'rxjs/operators';
import { ApiResponse } from './api-response';

export class SurveyImagesUiResponse extends ApiResponse{
    surveyImagesDtos:SurveyImagesUiDto[];
}
