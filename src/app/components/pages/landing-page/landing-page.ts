import { Component } from '@angular/core';
import { LoginButton } from "./buttons/login-button/login-button";
import { ContactButton } from "./buttons/contact-button/contact-button";
import { AboutUsButton } from "./buttons/about-us-button/about-us-button";
import { HomeButton } from "./buttons/home-button/home-button";
import { Header } from "./header/header";

@Component({
  selector: 'app-landing-page',
  imports: [LoginButton, ContactButton, AboutUsButton, HomeButton, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
