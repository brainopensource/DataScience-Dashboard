import { InformationContent } from '../../types/information/information';

export const informationContent: InformationContent = {
  title: 'System Information',
  description: 'Overview of system components and their current status',
  sections: [
    {
      id: 'row1',
      cards: [
        {
          id: 'hardware',
          title: 'Hardware Information',
          content:
            'CPU: Intel Core i7-12700K\nRAM: 32GB DDR4\nStorage: 1TB NVMe SSD\nGPU: NVIDIA RTX 3080',
          color: 'primary',
        },
        {
          id: 'software',
          title: 'Software Information',
          content: 'OS: Windows 11 Pro\nNode.js: v18.15.0\nReact: v18.2.0\nElectron: v25.0.0',
          color: 'secondary',
        },
      ],
    },
    {
      id: 'row2',
      cards: [
        {
          id: 'network',
          title: 'Network Configuration',
          content:
            'IP Address: 192.168.1.100\nGateway: 192.168.1.1\nDNS: 8.8.8.8\nMAC: 00:1A:2B:3C:4D:5E',
          color: 'info',
        },
        {
          id: 'security',
          title: 'Security Status',
          content:
            'Firewall: Active\nAntivirus: Up to date\nLast Scan: 2024-02-20\nUpdates: Current',
          color: 'warning',
        },
      ],
    },
    {
      id: 'row3',
      cards: [
        {
          id: 'performance',
          title: 'Performance Metrics',
          content: 'CPU Usage: 35%\nMemory Usage: 45%\nDisk Space: 65%\nNetwork: 100Mbps',
          color: 'success',
        },
        {
          id: 'maintenance',
          title: 'Maintenance Status',
          content:
            'Last Backup: 2024-02-19\nDisk Health: Good\nSystem Uptime: 7 days\nUpdates Available: 2',
          color: 'error',
        },
      ],
    },
  ],
};
