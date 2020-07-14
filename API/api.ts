import fetch from 'isomorphic-unfetch';

const baseURL = 'https://api.racegex.io';

import { LevelLesson, Level } from 'models';

const lessonsURL = `${baseURL}/lessons`;
const levelsURL = `${baseURL}/levels`;

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
