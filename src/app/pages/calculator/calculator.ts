import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rock {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  standalone: true
})
export class Calculator {
  userWeight: number | null = null;
  rocks: Rock[] = [];
  nextRockId = 0;
  hasStarted = false;
  hasSucceeded = false;

  readonly ROCK_WEIGHT = 2.58;

  get totalRockWeight(): number {
    return this.rocks.length * this.ROCK_WEIGHT;
  }

  get remainingWeight(): number {
    if (!this.userWeight) return 0;
    return Math.max(0, this.userWeight - this.totalRockWeight);
  }

  get progressPercentage(): number {
    if (!this.userWeight) return 0;
    return Math.min(100, (this.totalRockWeight / this.userWeight) * 100);
  }

  startCalculation(): void {
    if (this.userWeight && this.userWeight > 0) {
      this.hasStarted = true;
      this.rocks = [];
      this.hasSucceeded = false;
    }
  }

  addRock(): void {
    if (!this.hasStarted) return;

    // Random position within backpack area
    const x = Math.random() * 80 + 10; // 10-90% width
    const y = Math.random() * 70 + 15; // 15-85% height
    const rotation = Math.random() * 360;

    const newRock: Rock = {
      id: this.nextRockId++,
      x,
      y,
      rotation
    };

    this.rocks.push(newRock);

    // Check if succeeded
    if (this.totalRockWeight >= (this.userWeight || 0)) {
      setTimeout(() => {
        this.hasSucceeded = true;
      }, 300);
    }
  }

  removeRock(): void {
    if (this.rocks.length > 0) {
      this.rocks.pop();
      this.hasSucceeded = false;
    }
  }

  reset(): void {
    this.userWeight = null;
    this.rocks = [];
    this.hasStarted = false;
    this.hasSucceeded = false;
    this.nextRockId = 0;
  }
}
