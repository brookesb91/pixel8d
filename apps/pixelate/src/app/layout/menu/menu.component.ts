import { Component, OnInit, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'px-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  open$ = new BehaviorSubject(false);

  @HostBinding('class.open')
  get isOpen() {
    return this.open$.value;
  }

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.open$.next(!this.isOpen);
  }
}
