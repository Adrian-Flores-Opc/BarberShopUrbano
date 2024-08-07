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
export class UpdateUserRequest{
    public trace !: string;
    public idUser!: number;
    public idPerfil!: number;
    public dataBasic!: UserModel;
    public resetPass!: boolean;
}
export class Perfil{
    public id! : string;
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
export class UserCreateRequest{
    public trace !: string;
    public idPerfil!: string;
    public user!: UserModel;
    public loginUser!: UserAuthentication;
}
export class UserModel {
    public lastName! : string;
    public motherLastName! : string;
    public names! : string;
    public image! : string;    
}
export class barberModel{
    public alias !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public image !: string;
}
export class perfilsResponse extends Commonresult{
    public perfils!:Perfil[];
}