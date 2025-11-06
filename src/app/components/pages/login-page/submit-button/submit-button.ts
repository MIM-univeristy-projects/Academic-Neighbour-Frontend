import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-submit-button',
  imports: [CommonModule],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.css',
})
export class SubmitButton {
// @Input() pozwala rodzicowi (login-page) przekazać dane DO tego komponentu
  
  /** Jaki tekst ma być na przycisku? */
  @Input() text: string = 'Submit';
  
  /** Czy przycisk ma być nieaktywny? */
  @Input() disabled: boolean = false;

  // @Output() pozwala temu komponentowi emitować zdarzenia DO rodzica
  
  /** Emituje zdarzenie, gdy przycisk zostanie kliknięty */
  @Output() buttonClick = new EventEmitter<void>();
}
