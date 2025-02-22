import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-links',
  imports: [NgFor, RouterModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  links = [
    { name: 'אתר מס ערך מוסף', link: 'https://www.gov.il/he/departments/israel_tax_authority/govil-landing-page' },
    { name: 'אתר מס הכנסה', link: 'https://www.gov.il/he/departments/topics/income_tax_israel_tax_authority/govil-landing-page' },
    { name: 'אתר ביטוח לאומי', link: 'https://www.btl.gov.il/Pages/default.aspx' },
    { name: 'אתר משרד האוצר', link: 'https://www.gov.il/he/departments/ministry_of_finance/govil-landing-page' },
    { name: 'המוסד הישראלי לתקינה חשבונאית', link: 'https://www.iasb.org.il/' },
    { name: "רשם החברות", link: 'https://www.gov.il/he/departments/topics/registrar_of_companies/govil-landing-page' },
    { name: "רשות התאגידים", link: 'https://www.gov.il/he/departments/israeli_corporations_authority/govil-landing-page' },
    { name: "מחשבון נקודות זיכוי", link: 'https://www.gov.il/he/service/tax-credit' },
    { name: "הבורסה לניירות ערך", link: 'https://www.tase.co.il/he' },

  ];
}
