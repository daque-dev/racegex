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

export type Lesson = {
  id: number;
  name: string;
  content: string;
  excercises: string;
  next?: string;
  prev?: string;
};
