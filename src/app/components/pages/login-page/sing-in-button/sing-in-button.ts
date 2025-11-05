import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sing-in-button',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './sing-in-button.html',
  styleUrl: './sing-in-button.css',
})
export class SingInButton {

}
