export type IndividualTest = {
  content: { text: string; matched: boolean }[];
  success: boolean;
};

export type RegexTest = {
  description: string;
  visible: RegexTestMatches;
  hidden: RegexTestMatches;
};

export type RegexTestMatches = {
  shouldMatch: string[] | IndividualTest[];
  shouldNotMatch: string[] | IndividualTest[];
};

export type Problem = {
  id: number;
  name: string;
  description: string;
};

export type LevelLesson = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excercises: string;
  levelId: string;
  level: Level;
  nextId?: string;
  nextTitle?: string;
  nextLevel?: string;
  prev?: string;
  prevTitle?: string;
  prevLevel?: string;
};

export type Level = {
  id: string;
  title: string;
  subtitle: string;
  lessons: LevelLesson[];
};
