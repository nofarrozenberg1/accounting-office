import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  baseUrl = window.location.origin;

  constructor(readonly location: Location) {
    this.baseUrl = this.location.prepareExternalUrl('');
  }
}
