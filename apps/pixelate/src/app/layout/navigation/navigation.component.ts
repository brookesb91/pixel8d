import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface NavItem {
  title: string;
  link: string[];
  options?: { exact?: boolean };
}

@Component({
  selector: 'px-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  items: NavItem[] = [
    {
      title: 'Gallery',
      link: ['/gallery'],
    },
    {
      title: 'Editor',
      link: ['/editor'],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
