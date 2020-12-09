import { DamageUiDto } from './damage-ui-dto';

export class DamageImageUiDto {

  imageByteArray: string;
  positionName: string;
  comment: string;
  damageDtos: DamageUiDto[];

  constructor(imageByteArray?: string, positionName?: string, comment?: string, damageDtos?: DamageUiDto[]) {
    this.imageByteArray = imageByteArray;
    this.positionName = positionName;
    this.comment = comment;
    this.damageDtos = damageDtos;

    }

}
