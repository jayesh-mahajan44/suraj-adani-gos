export class User {
    //DT_RowId:number;
    //userId: number;
    username: string;
    password: string;
    creationTime?: Date;
    modifiedTime?: Date;
    active: boolean;
    constructor(username?: string, password?: string, creationTime?: Date, modifiedTime?: Date, active?: boolean) {
        this.username = username;
        this.password = password;
        this.active = active;
        this.creationTime = creationTime;
        this.modifiedTime = modifiedTime;
    }
}
