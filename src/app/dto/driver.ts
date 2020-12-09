export class Driver {

  driverId: number;
  driverName: string;
  licenseNumber: string;
  contactNumber: string;
  licenseValidityDate: string;
  licenseImagePath: string;
  licenseImageInBase64Format: string;
  active: boolean;
  createdBy: string;
  creationTime?: Date;
  modifiedBy: string;
  modifiedTime?: Date;

  constructor(driverId?: number, driverName?: string, licenseNumber?: string, contactNumber?: string, licenseValidityDate?: string, licenseImagePath?: string, licenseImageInBase64Format?: string, active?: boolean, createdBy?: string, creationTime?: Date, modifiedBy?: string, modifiedTime?: Date) {
    this.driverId = driverId;
    this.driverName = driverName;
    this.licenseNumber = licenseNumber;
    this.contactNumber = contactNumber;
    this.licenseValidityDate = licenseValidityDate;
    this.licenseImagePath = licenseImagePath;
    this.licenseImageInBase64Format = licenseImageInBase64Format
    this.active = active;
    this.createdBy = createdBy;
    this.creationTime = creationTime;
    this.modifiedBy = modifiedBy;
    this.modifiedTime = modifiedTime;
  }

}
