import { Component, Injectable } from '@angular/core';
import { MasnyKomponent } from "./masny-komponent/masny-komponent";
import { Inny } from "./inny/inny";

@Component({
  selector: 'app-testowy',
  imports: [MasnyKomponent, Inny],
  templateUrl: './testowy.html',
  styleUrl: './testowy.css',
})
export class Testowy {

}
