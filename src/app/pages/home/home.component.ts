import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  currentWord = '';
  currentTypingWord = '';
  spaceKeyEntered = true;
  constructor() {}

  ngOnInit(): void {
    // this.selectedTabIndex = 0;
    // this.countdown.begin();
    paragraph.split(' ').forEach((text) => {
      this.stringArr.push(`${text} `);
    });
    this.currentWord = this.stringArr[0];
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
  onInputKeyDown(ev: KeyboardEvent): void {
    const keycode = ev.code;
    const isSpaceKey = keycode === 'Space';
    const isShiftKey = keycode === 'Shift';
    const isDeleteKey = keycode === 'Backspace';
    if (isSpaceKey) {
      this.spaceKeyEntered = !this.spaceKeyEntered;
    }
    const isTypingWordEmpty = this.currentTypingWord.length === 0;
    if (isDeleteKey) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (!isShiftKey && !isDeleteKey) {
      // if (this.spaceKeyEntered) {
      //   // start preparing word
      //   this.currentTypingWord = this.currentTypingWord.concat(ev.key);
      // }
      if (isSpaceKey && !isTypingWordEmpty) {
        // end of word
        const expectedWord = this.stringArr[this.currentWordIndex].trim();
        const realWord = this.currentTypingWord;
        expectedWord === realWord ? (this.score += 10) : (this.score -= 5);
        this.currentWordIndex += 1;
        this.currentTypingWord = '';
        console.log(expectedWord, ' ', realWord);
      } else {
        this.currentTypingWord = this.currentTypingWord.concat(ev.key);
      }
      // if (!this.spaceKeyEntered && isTypingWordEmpty) {
      //   // first word
      //   this.currentTypingWord = this.currentTypingWord.concat(ev.key);
      // }
    }
  }
}
