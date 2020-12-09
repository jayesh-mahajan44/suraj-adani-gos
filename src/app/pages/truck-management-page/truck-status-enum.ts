export class TruckStatus {
    statusId: number;
    status: string;
}

export enum TruckStatusEnum {
    Active,
    Inactive,
    BlackListed
}