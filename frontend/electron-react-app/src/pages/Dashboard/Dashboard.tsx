import React from 'react';
import { DashboardGrid } from '../../components/features/dashboard/DashboardGrid';
import { dashboardContent } from '../../data/dashboard/dashboardData';

const Dashboard: React.FC = () => <DashboardGrid content={dashboardContent} />;

export default Dashboard;
