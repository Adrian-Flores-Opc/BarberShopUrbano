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

export class getAvailableBarbersModels extends genericResponse{
    public user !: containsBarbers[];
}
export class containsBarbers{
    public barber !: barbersModels;
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