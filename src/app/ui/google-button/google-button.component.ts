import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClick = output<void>();
}
