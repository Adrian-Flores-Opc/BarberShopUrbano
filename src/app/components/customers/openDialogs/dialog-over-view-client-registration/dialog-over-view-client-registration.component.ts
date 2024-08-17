import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { createClient } from '../../../../models/viewusers/user-administration.model.model';
import { createClientResponse } from '../../../../models/viewusers/user-administration.model.model';
import { FormsModule, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-over-view-client-registration',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatDialogTitle,MatDialogContent, MatDialogActions ],
  templateUrl: './dialog-over-view-client-registration.component.html',
  styleUrl: './dialog-over-view-client-registration.component.scss'
})
export class DialogOverViewClientRegistrationComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DialogOverViewClientRegistrationComponent>);
  public _createNewClientRequest !: createClient;
  public _createNewClientResponse !: createClientResponse;
  registerForm!: UntypedFormGroup;


  constructor(private _barbserService: BarbersAdministrationService) { }

  ngOnInit(): void {
    this._createNewClientRequest = new createClient();
    this._createNewClientResponse = new createClientResponse();
    this.registerForm = new UntypedFormGroup({
      lastName: new UntypedFormControl({ value: '', disabled: false}, [ Validators.required, Validators.minLength(2), Validators.maxLength(50)  ] ),
      motherLastName: new UntypedFormControl({ value: '', disabled: false}, [ Validators.required, Validators.minLength(2), Validators.maxLength(50)  ] ),
      names: new UntypedFormControl({ value: '', disabled: false}, [ Validators.required, Validators.minLength(2), Validators.maxLength(50)  ] ),
      email: new UntypedFormControl({ value: '', disabled: false}, [ Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email  ] ),
      cellphone: new UntypedFormControl({ value: '', disabled: false}, [ Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')  ] )
    });
  }

  public onNolick(): void {
    this.dialogRef.close({ event: 'onNoClick' });
  }

  public saveClientRegistration(_createNewClient : createClient): void {
    this.dialogRef.close({ event: 'saveClientRegistration', data: _createNewClient });
    this._barbserService.createClient(_createNewClient).subscribe({ next: (_response) => {
      this._createNewClientResponse = _response;
      if (this._createNewClientResponse.respCode === "00"){

      }
      else {

      }
    }, error: (_error) => {

    }, complete:() =>{

    } });
  }

}
