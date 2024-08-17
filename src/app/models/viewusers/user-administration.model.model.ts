import { DecimalPipe } from "@angular/common";
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
export class ServiceBarber{
    public id! : string;
    public descriptionService! : string;
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
export class TypeFilter{
    public id! : string;
    public description! : string;
}
export class createClient {
    public trace !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public cellphone !: string;
    public email !: string;
}
export class createClientResponse extends Commonresult{
    public idClient !:string;
}
export class dataClient {
    public id !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public cellphone !: string;
    public email !: string;
}
export class dataClientFilter extends Commonresult{
    public client!:dataClient[];
}
export class filterClientRequest {
    public trace !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public cellphone !: string;
    public email !: string;
    public typeFilter !: string;
}
export class filterClient{
    public idClient!:string;
    public namesClient!: string;
  }
  export class InformationReservationResponse extends Commonresult{
    public dataReservation!:Information;
  }
  export class Information{
    public id !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public cellphone !: string;
    public email !: string;
    public idBarber !: string;
    public aliasBarber !: string;
    public dateReservation !: string;
  }
  export class ServicesResponse extends Commonresult{
    public services!: serviceBarber [];
  }
  export class serviceBarber{
    public id!: number;
    public description!: string;
    public price!: number;
  }

  export class cellphoneFilter{
    public cellphone!:string
  }
//CLIENT MODEL AUXILIAR
export class registerBox{
    public guid!: string;
    public idTypeService!: number;
    public typeService!: string;
    public price!: number;
    public qty!: number;
    public discount!: number;
    public subTotal!: number;
  }
  //END CLIENT

