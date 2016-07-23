import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES} from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles: [`
  `],
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
    <h1>About</h1>
    
    <p>
  <button type="button" class="btn btn-primary btn-sm"
          (click)="status.open = !status.open">Toggle last panel
  </button>
  <button type="button" class="btn btn-primary btn-sm"
          (click)="status.isFirstDisabled = ! status.isFirstDisabled">Enable / Disable first panel
  </button>
</p>
 
<div class="checkbox">
  <label>
    <input type="checkbox" [(ngModel)]="oneAtATime">
    Open only one at a time
  </label>
</div>
 
<accordion [closeOthers]="oneAtATime">
  <accordion-group heading="Static Header, initially expanded"
                   [isOpen]="status.isFirstOpen"
                   [isDisabled]="status.isFirstDisabled">
    This content is straight in the template.
  </accordion-group>
  <accordion-group *ngFor="let group of groups" [heading]="group.title">
     {{ group?.content }}
  </accordion-group>
  <accordion-group heading="Dynamic Body Content">
    <p>The body of the accordion group grows to fit the contents</p>
    <button type="button" class="btn btn-primary btn-sm" (click)="addItem()">Add Item</button>
    <div *ngFor="let item of items">{{item}}</div>
  </accordion-group>
  <accordion-group let group [isOpen]="status.open">
    <div accordion-heading>
      I can have markup, too!
      <i class="pull-right glyphicon"
         [ngClass]="{'glyphicon-chevron-down': group?.isOpen, 'glyphicon-chevron-right': !group?.isOpen}"></i>
    </div>
    This is just some content to illustrate fancy headings.
  </accordion-group>
</accordion>
    
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class About {
  localState;
  constructor(public route: ActivatedRoute) {

  }
    
      public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];
 
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
 
  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
 
  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
