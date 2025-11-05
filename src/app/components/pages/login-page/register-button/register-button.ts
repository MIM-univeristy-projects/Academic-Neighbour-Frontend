import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-register-button',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './register-button.html',
  styleUrl: './register-button.css',
})
export class RegisterButton {

}
