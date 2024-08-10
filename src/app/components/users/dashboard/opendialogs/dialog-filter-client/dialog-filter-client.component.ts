import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { dataClient, filterClientRequest, TypeFilter } from '../../../../../models/viewusers/user-administration.model.model';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BarbersAdministrationService } from '../../../../../core/barbers-administration.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog-filter-client',
  standalone: true,  
  imports: [
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './dialog-filter-client.component.html',
  styleUrl: './dialog-filter-client.component.scss'
})
export class DialogFilterClientComponent {
  public filter!:string;
  public selectedValue!: string;
  public _requestFilter!: filterClientRequest;
  public typeFilters: TypeFilter[]  =
  [
    { id: 'ln', description: 'LAST NAME' },
    { id: 'mln', description: 'MOTHER LAST NAME' },
    { id: 'n', description: 'NAMES' },
    { id: 'c', description: 'CELLPHONE' },
    { id: 'e', description: 'EMAIL' }
  ];
  public client!: dataClient;
  public Element!:dataClient[];
  public displayedColumns: string[] = ['id','lastname', 'motherlastname', 'names', 'cellphone','email'];
  public dataSource = new MatTableDataSource(this.Element);
  clickedRows = new Set<dataClient>();
  readonly dialogRef = inject(MatDialogRef<DialogFilterClientComponent>);
  constructor(private barbersService:BarbersAdministrationService){
    
  }
  ngOnInit(): void{
    this.client = new dataClient();    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }  
  searchClient(): void{
    alert('Entro');
    this._requestFilter = new filterClientRequest();

    if(this.selectedValue == "ln" || this.selectedValue == "mln" || this.selectedValue == "n")
    {
      this._requestFilter.typeFilter = "NAMES";
      if(this.selectedValue == "ln")
        this._requestFilter.lastName = this.filter;
      if(this.selectedValue == "mln")
        this._requestFilter.motherLastName = this.filter;
      if(this.selectedValue == "n")
        this._requestFilter.names = this.filter;
    }      
    else if(this.selectedValue == "e")
    {
      this._requestFilter.typeFilter = "EMAIL";
      this._requestFilter.email = this.filter;
    }
    else if(this.selectedValue == "c")
    {
      this._requestFilter.typeFilter = "CELLPHONE";
      this._requestFilter.cellphone = this.filter;
    }
    this._requestFilter.trace = "123456";
    this.barbersService.filterInformationClient(this._requestFilter).subscribe({next:(response)=>{
      console.log(response);
      this.dataSource = new MatTableDataSource(response.client);
    }})
  }
  handleRowClick(row: dataClient) {
    this.dialogRef.close({event: 'Ok', data:row});
  }
}
