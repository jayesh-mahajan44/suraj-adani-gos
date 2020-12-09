export class ExportTransactionUiCommonDto {

  noOfContainer?: number;
  pin1?: string;
  pin2?: string;
  container1?: string;
  container2?: string;
  captureSubmitButton?: boolean;

  constructor(noOfContainer?: number, pin1?: string, pin2?: string, container1?: string ,container2?: string,captureSubmitButton?: boolean) {
    
    this.container1 = container1;
    this.container2 = container2;
    this.noOfContainer = noOfContainer;
    this.pin1 = pin1;
    this.pin2 = pin2;
    this.captureSubmitButton = captureSubmitButton;
  }
}
