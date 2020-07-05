import axios from "axios";

import { Problem, LevelLesson, Level } from "../types";

const baseURL = "http://localhost:4000";

const problemsURL = baseURL + "/problems";
const lessonsURL = baseURL + "/lessons";
const levelsURL = baseURL + "/levels";

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProblem(problem: string): Promise<Problem> {
  return await getData<Problem>(`${problemsURL}/${problem}`);
}

export async function getProblems(): Promise<Problem[]> {
  return await getData<Problem[]>(problemsURL);
}

export async function getLesson(lesson: string): Promise<LevelLesson> {
  return await getData<LevelLesson>(`${lessonsURL}/${lesson}`);
}

export async function getLessons(): Promise<LevelLesson[]> {
  return await getData<LevelLesson[]>(lessonsURL);
}

export async function getLevel(level: string): Promise<Level> {
  return await getData<Level>(`${levelsURL}/${level}`);
}

export async function getLevels(): Promise<Level[]> {
  return await getData<Level[]>(levelsURL);
}
