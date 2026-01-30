import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  standalone: true
})
export class Gallery {
  images = [
    { src: 'assets/images/gallery/Jochem1.jpg', alt: 'Jochem 1' },
    { src: 'assets/images/gallery/Jochem2.webp', alt: 'Jochem 2' },
    { src: 'assets/images/gallery/Jochem3.jpg', alt: 'Jochem 3' },
    { src: 'assets/images/gallery/Jochem4.webp', alt: 'Jochem 4' },
    { src: 'assets/images/gallery/Jochem5.jpg', alt: 'Jochem 5' },
    { src: 'assets/images/gallery/Jochem6.png', alt: 'Jochem 6' },
    { src: 'assets/images/gallery/Jochem7.png', alt: 'Jochem 7' },
    { src: 'assets/images/gallery/Jochem8.png', alt: 'Jochem 8' },
    { src: 'assets/images/gallery/Jochem9.png', alt: 'Jochem 9' },
    { src: 'assets/images/gallery/Jochem10.png', alt: 'Jochem 10' },
    { src: 'assets/images/gallery/Jochem11.png', alt: 'Jochem 11' },
  ];

  selectedImage: string | null = null;

  openImage(imageSrc: string): void {
    this.selectedImage = imageSrc;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
