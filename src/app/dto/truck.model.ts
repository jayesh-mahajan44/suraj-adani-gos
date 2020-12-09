
export class Truck {

    truckId: number;
    registrationNumber: string;
    driverId: number;
    tagId: number;
    rfidTagId: string;
    batNo: string;
    status: string;
    createdBy: string;
    active: boolean;
    creationTime?: Date;
    modifiedBy: string;
    modifiedTime?: Date;

    constructor(truckId?: number, registrationNumber?: string, tagId?: number, rfidTagId?: string, batNo?: string, status?: string, createdBy?: string, Active?: boolean, creationTime?: Date, modifiedBy?: string, modifiedTime?: Date) {
        this.truckId = truckId;
        this.registrationNumber = registrationNumber;
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
