import { Component } from '@angular/core';
import { LoginButton } from '../buttons/login-button/login-button';
import { HomeButton } from '../buttons/home-button/home-button';
import { ContactButton } from '../buttons/contact-button/contact-button';
import { AboutUsButton } from '../buttons/about-us-button/about-us-button';

@Component({
  selector: 'app-header',
  imports: [LoginButton, HomeButton, ContactButton, AboutUsButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
