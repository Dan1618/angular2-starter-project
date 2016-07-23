import { Component, OnInit } from '@angular/core';
import { ColorService } from './colorTable.service';

@Component({
  selector: 'colortable',
  template: `
    <h1>{{title}}</h1>
    <div>
    <table class="table table-condensed">
        <tr *ngFor="let colorObj of colorArray">
            <td> {{ colorObj.colorName }} </td>
            <td [style.background]="colorObj.hexValue"></td>
        </tr>
    </table>
    
    </div>
  `,
  providers: [ColorService]
})

export class ColorComp {
constructor(private ColorService:ColorService) {}
  title = 'Table of names and colors';
  colorArray = [];
  getColors() {
      this.ColorService.getColors().then(colors => this.colorArray = colors);
  }
  ngOnInit() {
    this.getColors();
  }
}