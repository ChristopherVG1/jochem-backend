import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Fanpost {
  author: string;
  date: string;        // or Date if you prefer
  character: string;
  content: string;
}

@Component({
  selector: 'app-fanpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fanpage.html',
  styleUrl: './fanpage.css',
})
export class Fanpage {
  posts: Fanpost[] = [
    {
      author: 'Anonieme Jochem fan',
      date: '2026-02-17',
      character: 'Jochem',
      content: 'Jochem is een echte Jochem.'
    }
  ];

}
