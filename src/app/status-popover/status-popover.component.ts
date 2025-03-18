import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-status-popover',
  templateUrl: './status-popover.component.html',
  styleUrls: ['./status-popover.component.scss'],
  standalone: false
})
export class StatusPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) {}

  // Cambia el estado y lo pasa al componente principal
  changeStatus(status: string) {
    console.log('Estado cambiado a:', status);
    this.popoverController.dismiss(status); // Envía el estado seleccionado al componente principal
  }

  ngOnInit() {}
}