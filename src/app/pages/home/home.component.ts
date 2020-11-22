import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedTabIndex = 0;
  @ViewChild('countdown', { static: false })
  private countdown: CountdownComponent;
  config = {
    leftTime: 60,
  };
  score = 0;
  constructor() {}

  ngOnInit(): void {
    // this.selectedTabIndex = 0;
    // this.countdown.begin();
  }
  selectedTabChange(index: any): void {}
  handleEvent(ev: CountdownEvent): void {
    // ev.action === done
    // disable input box
    // debugger;
  }
  onStartTyping(ev: Event ): void {
  }
}
