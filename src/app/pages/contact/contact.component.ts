import { Component, inject, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../environment';
import { NgIf } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [NgIf, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  http = inject(HttpClient);
  formData: FormGroup;
  API_KEY = environment.googleMapsApiKey;
  emailServiceId = 'service_r1qchyc';
  emailTemplateId = 'template_7c53xhy';
  emailPublicKey = 'wMn1r948isd8EyrD6';
  data = {
    service_id: this.emailServiceId,
    template_id: this.emailTemplateId,
    user_id: this.emailPublicKey,
    template_params: {},
  };
  showEmailErrorMessage = false;
  showEmailSuccessMessage = false;
  sendingEmail = false;

  constructor(readonly builder: FormBuilder) {}

  ngOnInit() {
    this.formData = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    this.sendingEmail = true;
    this.data.template_params = this.formData.value;
    this.http
      .post('https://api.emailjs.com/api/v1.0/email/send', this.data, {
        responseType: 'text',
      })
      .subscribe({
        next: () => this.handleEmailSuccessMessage(),
        error: () => this.handleEmailErrorMessage(),
      });
  }

  handleEmailErrorMessage() {
    this.sendingEmail = false;
    this.showEmailErrorMessage = true;
    setTimeout(() => (this.showEmailErrorMessage = false), 5000);
  }

  handleEmailSuccessMessage() {
    this.sendingEmail = false;
    this.showEmailSuccessMessage = true;
    setTimeout(() => (this.showEmailSuccessMessage = false), 5000);
    this.resetForm();
  }

  resetForm() {
    this.formData.get('name')?.setValue('');
    this.formData.get('email')?.setValue('');
    this.formData.get('message')?.setValue('');
  }
}
