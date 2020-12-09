export class TruckUiDto {

    truckId: number;
    registrationNumber: string;
    driverId: number;
    licenseNumber: string;
    tagId: number;
    rfidTagId: string;
    batNo: string;
    driverName: string;
	licenseValidity: String;
    status: string;
    createdBy: string;
    active: boolean;
    creationTime?: Date;
    modifiedBy: string;
    modifiedTime?: Date;

    constructor(truckId?: number, registrationNumber?: string,driverId?: number, licenseNumber?: string,tagId?: number, rfidTagId?: string, batNo?: string, status?: string, createdBy?: string, Active?: boolean, creationTime?: Date, modifiedBy?: string, modifiedTime?: Date) {
        this.truckId = truckId;
        this.registrationNumber = registrationNumber;
        this.driverId= driverId;
        this.licenseNumber=licenseNumber;
        this.tagId = tagId;
        this.rfidTagId = rfidTagId;
        this.batNo = batNo;
        this.status = status;
        this.createdBy = createdBy;
        this.active = Active;
        this.creationTime = creationTime;
        this.modifiedBy = modifiedBy;
        this.modifiedTime = modifiedTime;
    }

}
