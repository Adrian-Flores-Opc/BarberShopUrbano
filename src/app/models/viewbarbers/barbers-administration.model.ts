import { Commonresult } from "../commonresult.model"
export class BarbersAdministration {
}
export class BarbersGetResponse extends Commonresult {
    public barbers! : InformationBarber[];    
}
export class InformationBarber {
    public barber! : Barber;
}
export class Barber {
    public id! : number;
    public state! : string;
    public alias! : string;
    public lastName! : string;
    public motherLastName! : string;
    public names! : string;
}