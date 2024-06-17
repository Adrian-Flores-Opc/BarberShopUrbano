import { Component } from '@angular/core';
import { BarbersComponent } from '../barbers/barbers.component';
import { BoxesComponent } from '../boxes/boxes.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [BarbersComponent, BoxesComponent, RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {
  color: ThemePalette = 'primary';
  checked = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {
    
  }

  
  ngOnInit(): void {
  
  }

  public home():void{
  }
}
