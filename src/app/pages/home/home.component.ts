import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedTabIndex = 0;

  constructor() { }

  ngOnInit(): void {
    // this.selectedTabIndex = 0;
  }
  selectedTabChange(index: any): void {
  }
}
