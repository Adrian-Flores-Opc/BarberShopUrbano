import { Commonresult } from "../commonresult.model"
import { UserAuthentication } from "../viewlogin/user-authentication.model"
export class UserAdministrationModel extends Commonresult {
    public users!: User[];
}
export class User {
    public perfil!: Perfil;
    public information!:InformationUser;
    public loginInfo!: UserAuthentication;    
}
export class Perfil{
    public id! : number;
    public perfil! : string;
}
export class InformationUser{
    public id! : number;
    public state! : string;
    public dateCreated! : Date;
    public lastName! : string;
    public motherLastName! : string;
    public names! : string;
    public image! : string;
}
