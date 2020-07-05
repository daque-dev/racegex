import axios from "axios";

import { Problem, Lesson } from "../types";

const baseURL = "http://localhost:4000";

const problemsURL = baseURL + "/problems";
const lessonsURL = baseURL + "/lessons";

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

export async function getLesson(lesson: string): Promise<Lesson> {
  return await getData<Lesson>(`${lessonsURL}/${lesson}`);
}

export async function getLessons(lesson: string): Promise<Lesson> {
  return await getData<Lesson>(`${lessonsURL}/${lesson}`);
}
