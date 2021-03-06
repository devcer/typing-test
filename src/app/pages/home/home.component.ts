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
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

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
  currentTypingWord = '';
  spaceKeyEntered = false;
  typedText = new FormControl('');
  paragraphElements: any = [];

  ngOnInit(): void {
    this.constructStringArr(paragraph);
  }
  constructStringArr(paragraphStr: string): void {
    paragraphStr.split(' ').forEach((text) => {
      this.stringArr.push(`${text} `);
    });
  }
  selectedTabChange(index: number): void {
    this.config.leftTime = this.timeSetList[index] * 60;
    this.showStartButton = true;
  }
  handleEvent(ev: CountdownEvent): void {
    const isTimerDone = ev.action === 'done';
    if (isTimerDone) {
      this.typedText.disable();
      const score = this.calculateScore();
      setTimeout(() => {
        this.showAlert(score);
      }, 1000);
    }
  }
  startTimer(): void {
    this.paragraphElements = document
      .getElementById('typing-paragraph')
      ?.getElementsByTagName('span');
    this.countdown.begin();
  }
  startTypingTest(): void {
    this.showStartButton = false;
  }
  calculateScore(): number {
    const inputText = this.typedText.value.trim();
    let score = 0;
    inputText.split(' ').forEach((word: string, index: number) => {
      const expectedWord = this.stringArr[index].trim();
      const didWordsMatch = expectedWord === word;
      // Uncomment for logging purpose
      console.log(
        `expectedWord: ${expectedWord} realWord: ${word} didWordsMatch: ${didWordsMatch}`
      );
      if (didWordsMatch) {
        score += 10;
      } else {
        score -= 5;
      }
    });
    return score;
  }
  onInputKeyDown(ev: KeyboardEvent): void {
    const isSpaceKey = ev.which === 32;

    if (this.spaceKeyEntered && isSpaceKey) {
      // Do not allow the next space key
      ev.preventDefault();
      ev.stopPropagation();
    } else if (isSpaceKey) {
      // if Space key then highlight the next word
      this.spaceKeyEntered = true;
      this.currentWordIndex = this.typedText.value.split(' ').length - 1;
      this.paragraphElements[this.currentWordIndex].scrollIntoView({
        behaviour: 'smooth',
        block: 'center',
      });
    } else {
      this.currentWordIndex = this.typedText.value.split(' ').length - 1;
      this.spaceKeyEntered = false;
    }
    // if there are fewer than 50 new words then repeat the words again.
    if (this.paragraphElements.length - this.currentWordIndex < 50) {
      this.constructStringArr(paragraph);
    }
  }
  resetTest(): void {
    this.showStartButton = true;
    this.typedText.enable();
    this.typedText.reset('');
    this.score = 0;
    this.currentWordIndex = 0;
    this.stringArr = [];
    this.constructStringArr(paragraph);
  }
  showAlert(score: number): void {
    Swal.fire('Time is Up', `Your score is ${score}`, 'success').then(() => {
      this.resetTest();
    });
  }
}
