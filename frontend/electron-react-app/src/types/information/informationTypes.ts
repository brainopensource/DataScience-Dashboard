export interface InformationCard {
  id: string;
  title: string;
  content: string;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface InformationSection {
  id: string;
  cards: InformationCard[];
}

export interface InformationContent {
  title: string;
  description: string;
  sections: InformationSection[];
}
