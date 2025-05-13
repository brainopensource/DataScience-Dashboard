import { DashboardContent } from '../../types/dashboard/dashboard';

export const dashboardContent: DashboardContent = {
  title: 'Welcome to Dashboard',
  description: 'This is a dynamic dashboard built with our modular grid system. The layout is fully responsive and can be easily customized.',
  stats: [
    { id: 'stat1', title: 'Total Users', content: '1,234 active users', color: 'primary' },
    { id: 'stat2', title: 'Revenue', content: '$45,678 this month', color: 'secondary' },
    { id: 'stat3', title: 'Tasks', content: '12 pending tasks', color: 'success' },
  ],
  image: {
    id: 'image1',
    src: 'https://miro.medium.com/max/1080/1*8DDN_DRuSBlM74dVYUjR9Q.png',
    alt: 'Dashboard Preview',
    aspectRatio: 16 / 9,
  },
  text: {
    id: 'text1',
    title: 'About This Dashboard',
    content: 'This dashboard demonstrates the flexibility of our grid system. Each component is modular and can be easily customized. The layout is responsive and will adapt to different screen sizes.',
  },
  actions: [
    { id: 'button1', title: 'Quick Actions', content: 'Perform common tasks with a single click', buttonText: 'Get Started', buttonVariant: 'contained', buttonColor: 'primary' },
    { id: 'button2', title: 'Need Help?', content: 'Our support team is here to assist you', buttonText: 'Contact Support', buttonVariant: 'outlined', buttonColor: 'secondary' },
  ],
}; 