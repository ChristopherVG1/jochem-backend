import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Step = 'weight' | 'fatPercentage' | 'muscleMass' | 'muscleEstimate' | 'rockWeight' | 'result';
type Gender = 'male' | 'female';
type AgeGroup = 'young' | 'adult' | 'old';

interface CalcResult {
  fatMass: number;
  muscleMass: number;
  otherMass: number;
  fatVolume: number;
  muscleVolume: number;
  otherVolume: number;
  bodyVolume: number;
  bodyDensity: number;
  floatsAlone: boolean;
  rockVolume: number;
  netBuoyancyPerRock: number;
  deficit: number;
  rocksNeeded: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
  // Densities in kg/L (= g/ml)
  readonly DENSITY_FAT    = 0.9;
  readonly DENSITY_MUSCLE = 1.06;
  readonly DENSITY_OTHER  = 1.0;   // organs, bone, body water
  readonly DENSITY_BRICK  = 1.6;
  readonly DENSITY_WATER  = 1.0;

  currentStep: Step = 'weight';

  userWeight:       number | null = null;
  fatPercentage:    number | null = null;
  muscleMassKnown:  boolean | null = null;
  muscleMass:       number | null = null;
  gender:           Gender | null = null;
  ageGroup:         AgeGroup | null = null;
  rockWeight:       number | null = null;

  result: CalcResult | null = null;

  // Average muscle mass as fraction of body weight (based on DEXA-scan population averages)
  private readonly AVG_MUSCLE: Record<Gender, Record<AgeGroup, number>> = {
    male:   { young: 0.42, adult: 0.38, old: 0.32 },
    female: { young: 0.34, adult: 0.30, old: 0.25 }
  };

  // ── Navigation ──────────────────────────────────────────────────────────────

  goToStep(step: Step): void { this.currentStep = step; }

  nextFromWeight(): void {
    if (this.userWeight && this.userWeight > 0)
      this.currentStep = 'fatPercentage';
  }

  nextFromFat(): void {
    if (this.fatPercentage !== null && this.fatPercentage >= 1 && this.fatPercentage < 100)
      this.currentStep = 'muscleMass';
  }

  selectMuscleMassKnown(known: boolean): void {
    this.muscleMassKnown = known;
    if (!known) this.currentStep = 'muscleEstimate';
  }

  nextFromMuscleMass(): void {
    if (this.muscleMassKnown && this.muscleMass !== null && this.muscleMass > 0 && !this.muscleMassError) {
      this.currentStep = 'rockWeight';
    }
  }

  nextFromMuscleEstimate(): void {
    if (this.gender && this.ageGroup) {
      this.muscleMass = this.getEstimatedMuscle();
      this.currentStep = 'rockWeight';
    }
  }

  nextFromRockWeight(): void {
    if (this.rockWeight && this.rockWeight > 0) {
      this.calculate();
      this.currentStep = 'result';
    }
  }

  reset(): void {
    this.currentStep = 'weight';
    this.userWeight = this.fatPercentage = this.muscleMass = this.rockWeight = null;
    this.muscleMassKnown = null;
    this.gender = null;
    this.ageGroup = null;
    this.result = null;
  }

  // ── Calculation ──────────────────────────────────────────────────────────────

  calculate(): void {
    const W = this.userWeight!;
    const fatMass    = W * (this.fatPercentage! / 100);
    const muscleMass = Math.min(this.muscleMass!, W - fatMass);
    const otherMass  = Math.max(0, W - fatMass - muscleMass);

    const fatVolume    = fatMass    / this.DENSITY_FAT;
    const muscleVolume = muscleMass / this.DENSITY_MUSCLE;
    const otherVolume  = otherMass  / this.DENSITY_OTHER;
    const bodyVolume   = fatVolume + muscleVolume + otherVolume;

    const bodyDensity  = W / bodyVolume;
    const floatsAlone  = bodyDensity < this.DENSITY_WATER;

    const R                  = this.rockWeight!;
    const rockVolume         = R / this.DENSITY_BRICK;
    const netBuoyancyPerRock = R - rockVolume;      // extra mass vs displaced water per rock
    const deficit            = bodyVolume - W;       // positive → floats → needs rocks

    const rocksNeeded = floatsAlone
      ? Math.ceil(deficit / netBuoyancyPerRock)
      : 0;

    this.result = {
      fatMass, muscleMass, otherMass,
      fatVolume, muscleVolume, otherVolume,
      bodyVolume, bodyDensity, floatsAlone,
      rockVolume, netBuoyancyPerRock, deficit, rocksNeeded
    };
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  getEstimatedMuscle(): number {
    if (!this.gender || !this.ageGroup || !this.userWeight) return 0;
    return this.userWeight * this.AVG_MUSCLE[this.gender][this.ageGroup];
  }

  get muscleMassError(): string | null {
    if (!this.userWeight || this.fatPercentage === null || !this.muscleMass) return null;
    const maxLean = this.userWeight * (1 - this.fatPercentage / 100);
    if (this.muscleMass > maxLean)
      return `Max ${maxLean.toFixed(1)} kg (vetvrije massa bij ${this.fatPercentage}% vet)`;
    return null;
  }

  isStepDone(step: Step): boolean {
    const order: Step[] = ['weight', 'fatPercentage', 'muscleMass', 'rockWeight', 'result'];
    const normalize = (s: Step): Step => s === 'muscleEstimate' ? 'muscleMass' : s;
    return order.indexOf(step) < order.indexOf(normalize(this.currentStep));
  }
}
