export class DamageUiDto {
    id:number;
    name: string;
    damage: boolean;
    constructor( id?:number, name?: string, damage?: boolean,)
    {
     this.damage=damage;
     this.id=id;
     this.name=name;
        }
}

