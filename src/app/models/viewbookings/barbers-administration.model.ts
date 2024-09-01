import { filterClientRequest } from './../viewusers/user-administration.model.model';
export class BarbersAdministration {
}

//#region Cellphone Verification / Registration client
export class cellphoneVerification{
    public cellphone !: string;
}
//#endregion

//#region  Models Get Available Barbers
export class genericResponse{
    public respCode !: string;
    public detailMessage !: string;
}

export class getAvailableBarbersViewsModels extends genericResponse{
  public viewBarbersDetail !: getAvailableBarbersModels[];
}

export class getAvailableBarbersModels extends genericResponse{
    public barbers !: barbersModels[];
}

export class barbersModels{
    public id! : number ;
    public state !: string;
    public alias !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public image !: string;
}
//#endregion
//#region  Models Get Available Barbers
export class barberCreateRequest{
    public trace !: string;
    public barber !: barbersModels;
}

export class barberModel{
    public alias !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public image !: string;
}
//#endregion


export class createNewClientRequest{
    public trace !: string;
    public lastName !: string;
    public motherLastName !: string;
    public names !: string;
    public email !: string;
    public cellphone !: string;
}


export class createNewClientResponse extends genericResponse{
  public idClient !: string;
}


export class getTimesByBarberRequest{
  public trace !: string;
  public idBarber !: number;
  public date !: string;
}

export class getTimesByBarberResponse extends genericResponse{
  public avilablesTimesBarber !: getTimesByBarberData[];
}

export class getTimesByBarberData {
  public idAvailableTurn !: number;
  public turnInit !: string;
  public turnEnd !: string;
}
