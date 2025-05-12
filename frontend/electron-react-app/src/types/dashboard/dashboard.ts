export interface StatCard {
  id: string;
  title: string;
  content: string;
  color: 'primary' | 'secondary' | 'success';
}

export interface ContentImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio?: number;
}

export interface ContentText {
  id: string;
  title: string;
  content: string;
}

export interface ActionCard {
  id: string;
  title: string;
  content: string;
  buttonText: string;
  buttonVariant: 'contained' | 'outlined';
  buttonColor: 'primary' | 'secondary';
}

export interface DashboardContent {
  title: string;
  description: string;
  stats: StatCard[];
  image: ContentImage;
  text: ContentText;
  actions: ActionCard[];
} 