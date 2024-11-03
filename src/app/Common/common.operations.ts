import Swal from "sweetalert2";

export class CommonOperations{

  public showAlert(title: string, icon:string, background: string, colorFont: string){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: background, // Color de fondo
      color: colorFont, // Color de letra
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    if(icon=="success"){
      Toast.fire({
        icon: "success",
        title: title
      });
    }
    else if(icon=="error"){
      Toast.fire({
        icon: "error",
        title: title
      });
    }
    else if(icon=="info"){
      Toast.fire({
        icon: "info",
        title: title
      });
    }
    
  
  }
}