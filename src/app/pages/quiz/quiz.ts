import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

interface Question {
  question: string;
  answers: string[];
}

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
  standalone: true
})
export class Quiz {
  quizStarted = false;
  quizFinished = false;
  currentQuestionIndex = 0;
  result = '';
  resultImage = '';

  // Track specific answers for logic
  private isAlwaysAngry = false; // Question 6
  private hasJochemCrush = false; // Question 9

  questions: Question[] = [
    {
      question: 'Wat is je gewicht?',
      answers: ['~70kg', '~100kg', '~200kg']
    },
    {
      question: 'Wordt je gepest?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Houdt je van patat?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Ben je blond?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Schoenmaat?',
      answers: ['~40', '~45']
    },
    {
      question: 'Ben je altijd boos?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Heb je zwemdiploma\'s?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Wat zit er in je rugzak?',
      answers: ['Stenen', 'Boeken']
    },
    {
      question: 'Heeft Jochem een crush op je?',
      answers: ['Ja', 'Nee']
    },
    {
      question: 'Hoeveel biertjes lust je op een avond?',
      answers: ['10', '20', '50']
    }
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  startQuiz(): void {
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.quizFinished = false;
    this.isAlwaysAngry = false;
    this.hasJochemCrush = false;
  }

  selectAnswer(answer: string): void {
    // Track specific answers for result logic
    if (this.currentQuestionIndex === 5 && answer === 'Ja') {
      this.isAlwaysAngry = true;
    }
    if (this.currentQuestionIndex === 8 && answer === 'Ja') {
      this.hasJochemCrush = true;
    }

    // Move to next question or finish
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.quizFinished = true;

    // Determine result based on specific answers
    if (this.hasJochemCrush) {
      this.result = 'Vera';
      this.resultImage = 'assets/images/vera.webp';
    } else if (this.isAlwaysAngry) {
      this.result = 'David';
      this.resultImage = 'assets/images/david.webp';
    } else {
      this.result = 'Jochem';
      this.resultImage = 'assets/images/jochem.webp';
    }

    // Trigger confetti
    this.celebrate();
  }

  celebrate(): void {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }

  restartQuiz(): void {
    this.quizStarted = false;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.isAlwaysAngry = false;
    this.hasJochemCrush = false;
    this.result = '';
    this.resultImage = '';
  }
}
