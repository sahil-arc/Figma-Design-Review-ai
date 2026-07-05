export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Priority = 'high' | 'medium' | 'low';

export interface AIScores {
  overall: number;
  ui: number;
  ux: number;
  accessibility: number;
  visual: number;
  modernDesign: number;
  trust: number;
  conversion: number;
  performance: number;
  developer: number;
  maintainability: number;
}

export interface ScoreDetail {
  score: number;
  why: string;
}

export interface DetailedScores {
  overall: ScoreDetail;
  ui: ScoreDetail;
  ux: ScoreDetail;
  accessibility: ScoreDetail;
  visual: ScoreDetail;
  modernDesign: ScoreDetail;
  trust: ScoreDetail;
  conversion: ScoreDetail;
  performance: ScoreDetail;
  developer: ScoreDetail;
  maintainability: ScoreDetail;
}

export interface Suggestion {
  id: string;
  issue: string;
  reason: string;
  impact: string;
  severity: Severity;
  heuristic: string; // Violating principle/law (e.g. "Fitts' Law", "WCAG 2.1 AA 1.4.3")
  fix: string;
  previewCode?: string; // CSS, HTML, or Tailwind suggestion
  expectedImprovement: string;
  priority: Priority;
  timeToFix: number; // in minutes
  difficulty: Difficulty;
  category: string; // 'spacing' | 'typography' | 'color' | 'accessibility' | 'ux'
}

export interface ColorOptimization {
  name: string;
  originalHex: string;
  optimizedHex: string;
  reason: string;
  contrastWithBg: number;
  accessible: boolean;
}

export interface ColorHarmony {
  type: string; // e.g. Monochromatic, Analogous, Triadic, etc.
  description: string;
  colors: string[];
}

export interface ColorAnalysis {
  palette: ColorOptimization[];
  harmonies: ColorHarmony[];
  contrastRatioFeedback: string;
  generalSuggestions: string;
}

export interface TypographyPairing {
  headingFont: string;
  bodyFont: string;
  vibe: string;
  rationale: string;
}

export interface TypographyAnalysis {
  scaleConsistency: string;
  lineHeightFeedback: string;
  readabilityFeedback: string;
  pairingSuggestion: TypographyPairing;
}

export interface ComponentReview {
  name: string;
  detected: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface DesignSystemReview {
  duplicateColorsDetected: string[];
  unusedTypographyRules: string[];
  namingConventionScore: number;
  tokenConsistencyIssues: string[];
  variantsCountFeedback: string;
  designDebtEstimate: string; // e.g. "Low", "Medium", "High"
}

export interface HeatmapPoint {
  x: number;
  y: number;
  value: number;
}

export interface ReviewReport {
  id: string;
  title: string;
  platform: string;
  timestamp: string;
  imageUrl: string;
  scores: DetailedScores;
  suggestions: Suggestion[];
  colorAnalysis: ColorAnalysis;
  typographyAnalysis: TypographyAnalysis;
  components: ComponentReview[];
  designSystem: DesignSystemReview;
  executiveSummary: string;
  heatmap?: HeatmapPoint[];
}

export interface ReferenceLaw {
  name: string;
  definition: string;
  origin: string;
  example: string;
  practicalTips: string[];
}
