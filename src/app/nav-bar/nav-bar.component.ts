import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  baseUrl = window.location.origin;

  constructor(readonly location: Location) {
    this.baseUrl = this.location.prepareExternalUrl('');
  }
}
