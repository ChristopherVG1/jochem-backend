import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

interface Answer {
  text: string;
  points: { [character: string]: number };
}

interface Question {
  question: string;
  answers: Answer[];
}

interface CharacterScore {
  name: string;
  totalPoints: number;
  pointsPerQuestion: number[];
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

  characters = ['Jochem', 'David', 'Vera', 'Simbad', 'Sanne', 'Gym leraar'];
  scores: { [character: string]: CharacterScore } = {};
  sortedScores: CharacterScore[] = [];

  questions: Question[] = [
    {
      question: 'Wat is je gewicht?',
      answers: [
        { text: '~70kg', points: { 'Vera': 1 } },
        { text: '~100kg', points: { 'Jochem': 1 } },
        { text: '~200kg', points: { 'Jochem': 1 } }
      ]
    },
    {
      question: 'Wordt je gepest?',
      answers: [
        { text: 'Ja', points: { 'Jochem': 1 } },
        { text: 'Nee', points: { 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Houdt je van patat?',
      answers: [
        { text: 'Ja', points: { 'Jochem': 1, 'David': 1 } },
        { text: 'Nee', points: { 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Ben je blond?',
      answers: [
        { text: 'Ja', points: { 'Jochem': 1, 'Simbad': 1 } },
        { text: 'Nee', points: { 'David': 1, 'Vera': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Schoenmaat?',
      answers: [
        { text: '~40', points: { 'Vera': 1, 'Sanne': 1 } },
        { text: '~45', points: { 'Jochem': 1, 'David': 1, 'Simbad': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Ben je altijd boos?',
      answers: [
        { text: 'Ja', points: { 'David': 1, 'Sanne': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'Vera': 1, 'Simbad': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Heb je zwemdiploma\'s?',
      answers: [
        { text: 'Ja', points: { 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } },
        { text: 'Nee', points: { 'Jochem': 1 } }
      ]
    },
    {
      question: 'Wat zit er in je rugzak?',
      answers: [
        { text: 'Stenen', points: { 'Jochem': 2 } },
        { text: 'Boeken', points: { 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } },
        { text: 'Jochems Boek', points: { 'David': 1 } }
      ]
    },
    {
      question: 'Heeft Jochem een crush op je?',
      answers: [
        { text: 'Ja', points: { 'Vera': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'David': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Hoeveel biertjes lust je op een avond?',
      answers: [
        { text: '10', points: { 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } },
        { text: '20', points: { 'Jochem': 1 } },
        { text: '50', points: { 'Jochem': 1 } }
      ]
    },
    {
      question: 'Kan je piano spelen?',
      answers: [
        { text: 'Ja', points: { 'Jochem': 1 } },
        { text: 'Een beetje', points: { 'David': 1 } },
        { text: 'Totaal niet', points: { 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Ben je harig?',
      answers: [
        { text: 'Ja', points: { 'Simbad': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'David': 1, 'Vera': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Heeft jochem je achtergelaten?',
      answers: [
        { text: 'Ja', points: { 'Simbad': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'David': 1, 'Vera': 1, 'Sanne': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Wat is je slagzin?',
      answers: [
        { text: 'Zeg dat het je spijt!', points: { 'David': 1 } },
        { text: 'Knor', points: { 'Sanne': 1 } },
        { text: 'Silenceeee...', points: { 'Jochem': 1 } }
      ]
    },
    {
      question: 'Heb je een dikke vader?',
      answers: [
        { text: 'Ja', points: { 'Jochem': 1, 'Sanne': 1 } },
        { text: 'Nee', points: { 'David': 1, 'Vera': 1, 'Simbad': 1, 'Gym leraar': 1 } }
      ]
    },
    {
      question: 'Heb je Spijt?',
      answers: [
        { text: 'Ja', points: { 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1, 'Gym leraar': 1 } },
        { text: 'Totaal niet', points: { 'Gym leraar': 1 } },
        { text: 'Ik ben een dom wijf', points: { 'Sanne': 1 } }
      ]
    },
    {
      question: 'Ben je een beetje viezig?',
      answers: [
        { text: 'Ja', points: { 'Gym leraar': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1 } }
      ]
    },
    {
      question: 'Ben je de enige leraar die zichtbaar is?',
      answers: [
        { text: 'Ja', points: { 'Gym leraar': 1 } },
        { text: 'Nee', points: { 'Jochem': 1, 'David': 1, 'Vera': 1, 'Simbad': 1, 'Sanne': 1 } }
      ]
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

    // Initialize scores
    this.scores = {};
    this.characters.forEach(character => {
      this.scores[character] = {
        name: character,
        totalPoints: 0,
        pointsPerQuestion: new Array(this.questions.length).fill(0)
      };
    });
  }

  selectAnswer(answer: Answer): void {
    // Award points for this answer
    Object.keys(answer.points).forEach(character => {
      const points = answer.points[character];
      this.scores[character].totalPoints += points;
      this.scores[character].pointsPerQuestion[this.currentQuestionIndex] = points;
    });

    // Move to next question or finish
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.quizFinished = true;

    // Sort characters by points (descending)
    this.sortedScores = Object.values(this.scores).sort((a, b) => b.totalPoints - a.totalPoints);

    // Set result to highest scoring character
    this.result = this.sortedScores[0].name;
    this.resultImage = `assets/images/${this.result.toLowerCase().replace(' ', '-')}.webp`;

    // Trigger confetti
    this.celebrate();
  }

  getCharacterDescription(character: string): string {
    const descriptions: { [key: string]: string } = {
      'Jochem': 'Je bent Jochem! Je bent misschien wat zwaarder, maar je hebt een goed hart.',
      'David': 'Je bent David! Je bent vaak boos en hebt een kort lontje.',
      'Vera': 'Je bent Vera! Jochem heeft een crush op je!',
      'Simbad': 'Je bent Simbad! Jochem heeft je achtergelaten...',
      'Sanne': 'Je bent Sanne! Je zegt vaak "Knor"!',
      'Gym leraar': 'Je bent de Gym leraar! De enige leraar die zichtbaar is in het verhaal.'
    };
    return descriptions[character] || '';
  }

  getCharactersWithPointsForQuestion(questionIndex: number): string[] {
    return this.characters.filter(character =>
      this.scores[character].pointsPerQuestion[questionIndex] > 0
    );
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
    this.result = '';
    this.resultImage = '';
    this.scores = {};
    this.sortedScores = [];
  }
}
