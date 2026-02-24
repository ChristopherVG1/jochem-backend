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
    },
    {
      author: 'Anoniempje',
      date: '2026-02-19',
      character: 'Jochem',
      content: 'Beste Jochem,\n' +
        '\n' +
        'Je bent een groot idool van mij, hoe je piano speelde en patat vrat. Ik hoop dat meer kinderen op de middelbare school zoals jij worden. En Ton Kas zat in je film, groot fan!'
    },
    {
      author: 'Anonieme Jochem fan',
      date: '2026-02-24',
      character: 'Jochem',
      content: 'Spijt heeft mijn leven veranderd. Elke keer wanneer ik in mijn dagelijks leven het woord "spijt" hoor, word ik nu getriggerd. Ik ga mijn kind later Jochem noemen denk ik.'
    }
  ];

}
