import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent,
} from 'ngx-countdown';
import { paragraph } from 'src/assets/DummyData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedTabIndex = 0;
  timeSetList = [1, 3, 5];
  @ViewChild('countdown', { static: false })
  private countdown: CountdownComponent;
  config: CountdownConfig = {
    leftTime: 60,
    demand: true,
    format: 'mm:ss',
  };
  score = 0;
  stringArr: string[] = [];
  showStartButton = true;
  currentWordIndex = 0;
  constructor() {}

  ngOnInit(): void {
    // this.selectedTabIndex = 0;
    // this.countdown.begin();
    paragraph.split(' ').forEach((text) => {
      this.stringArr.push(`${text} `);
    });
  }
  selectedTabChange(index: any): void {
    this.config.leftTime = this.timeSetList[index] * 60;
    this.showStartButton = true;
  }
  handleEvent(ev: CountdownEvent): void {
    // ev.action === done
    // disable input box
    // debugger;
  }
  onStartTyping(ev: Event): void {}
  startTimer(): void {
    this.countdown.begin();
  }
  startTypingTest(): void {
    this.showStartButton = false;
  }
  onInputKeyUp(ev: KeyboardEvent): void {
    const keycode = ev.code;
    if (keycode === 'Space') {
    } else {
    }
  }
}
