import { Component } from '@angular/core';
import { $ } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '煜煜熊實戰';

  constructor() {
    console.log('testCode'+environment.testcode);
  }
}
