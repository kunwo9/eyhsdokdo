/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeographyItem {
  id: string;
  name: string;
  latLong: string;
  area: string;
  distUlleung: string;
  distOki: string;
  description: string;
}

export interface TerritoryElement {
  type: 'territory' | 'sea' | 'air' | 'eez';
  name: string;
  englishName: string;
  range: string;
  status: string;
  details: string;
}

export interface HistoricDocument {
  id: string;
  title: string;
  year: string;
  source: 'korea' | 'japan';
  quote: string;
  explanation: string;
  keyTakeaway: string;
}

export interface HistoricMap {
  id: string;
  title: string;
  year: string;
  description: string;
  source: 'korea' | 'japan';
  details: string[];
}

export interface ModernConflict {
  id: string;
  title: string;
  date: string;
  category: 'treaty' | 'defense' | 'fisheries' | 'dispute';
  summary: string;
  details: string[];
  lessonLearned: string;
}

export interface WorksheetState {
  memberKorea: string;
  memberJapan: string;
  title: string;
  content: string;
  evaluation: string;
  answers: {
    question1: string;
    question2: string;
    question3: string;
  };
}
