import { Component } from '@angular/core';
import { HomeButton } from '../buttons/home-button/home-button';
import { LoginButton } from '../buttons/login-button/login-button';
import { AboutUsButton } from '../buttons/about-us-button/about-us-button';
import { ContactButton } from '../buttons/contact-button/contact-button';

@Component({
  selector: 'app-footer',
  imports: [HomeButton, LoginButton, AboutUsButton, ContactButton],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear: number = new Date().getFullYear();

}
