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
  "should-match": string[] | IndividualTest[];
  "should-not-match": string[] | IndividualTest[];
};
