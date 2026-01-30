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
  ];

  selectedImage: string | null = null;

  openImage(imageSrc: string): void {
    this.selectedImage = imageSrc;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
