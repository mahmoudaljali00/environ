export interface ProjectData {
  id: string
  title: string
  category: string
  client?: string
  year: string
  location: string
  shortDesc: string
  fullDesc: string
  technologies: string[]
  images: string[]
}

export const projectsData: ProjectData[] = [
  {
    id: 'solar-khartoum',
    title: 'Khartoum North Solar Farm',
    category: 'Energy',
    client: 'Ministry of Energy',
    year: '2024',
    location: 'Khartoum North, Sudan',
    shortDesc: '5MW solar installation delivering clean energy to 3,000+ homes.',
    fullDesc:
      'A landmark solar photovoltaic project delivering 5 megawatts of clean energy to the Khartoum North district. ENVIRON handled all aspects from land survey, electrical design, and structural engineering through to procurement, installation, and grid connection. The project significantly reduced reliance on diesel generation and cut carbon emissions by an estimated 7,000 tonnes annually.',
    technologies: ['Solar PV', 'Grid-Tie Inverters', 'SCADA Monitoring', 'High-Voltage Cabling'],
    images: ['/project-1.jpg', '/project-3.jpg'],
  },
  {
    id: 'mep-tower',
    title: 'Central Business Tower MEP',
    category: 'MEP',
    client: 'Private Developer',
    year: '2023',
    location: 'Khartoum, Sudan',
    shortDesc: 'Full MEP design and installation for a 22-storey commercial tower.',
    fullDesc:
      'ENVIRON delivered comprehensive MEP services for one of Khartoum\'s tallest commercial towers. Our team coordinated all mechanical, electrical, and plumbing systems across 22 floors including central HVAC, fire suppression, emergency power, and BMS integration. The project was completed three weeks ahead of schedule.',
    technologies: ['BMS', 'VRF HVAC', 'LV Electrical', 'Fire Suppression', 'Plumbing'],
    images: ['/project-2.jpg', '/about-hero.jpg'],
  },
  {
    id: 'hvac-hospital',
    title: 'Al-Nour Hospital HVAC',
    category: 'Engineering',
    client: 'Al-Nour Medical Group',
    year: '2023',
    location: 'Omdurman, Sudan',
    shortDesc: 'Precision HVAC design and commissioning for a 400-bed hospital.',
    fullDesc:
      'This project required the highest standards of infection control and air quality. ENVIRON designed and installed a full HVAC system including laminar flow operating theatres, negative-pressure isolation rooms, and a central chilled water plant. All systems were commissioned and validated to HTM 03-01 standards.',
    technologies: ['Chilled Water HVAC', 'Laminar Flow', 'Isolation Rooms', 'BMS Integration'],
    images: ['/project-3.jpg', '/project-1.jpg'],
  },
  {
    id: 'water-pump-gadaref',
    title: 'Gadaref Water Distribution',
    category: 'Infrastructure',
    year: '2022',
    location: 'Gadaref, Sudan',
    shortDesc: 'Municipal water pumping network serving 50,000+ residents.',
    fullDesc:
      'A large-scale water infrastructure project covering the design, supply, and installation of a multi-zone distribution network. ENVIRON installed 12 pumping stations, 45km of pipework, and a SCADA-based remote monitoring system to ensure reliable water supply to the growing Gadaref municipality.',
    technologies: ['Submersible Pumps', 'HDPE Pipework', 'SCADA', 'Water Treatment'],
    images: ['/project-1.jpg', '/project-2.jpg'],
  },
  {
    id: 'security-embassy',
    title: 'Embassy Security Upgrade',
    category: 'Engineering',
    year: '2022',
    location: 'Khartoum, Sudan',
    shortDesc: 'Comprehensive security system upgrade for a diplomatic mission.',
    fullDesc:
      'ENVIRON delivered a full security and low current systems upgrade for a diplomatic compound. The project included IP CCTV with AI analytics, biometric access control, perimeter intrusion detection, and a hardened network infrastructure. All systems were installed to international diplomatic security standards.',
    technologies: ['IP CCTV', 'Biometric Access', 'Perimeter IDS', 'Structured Cabling'],
    images: ['/project-3.jpg', '/about-hero.jpg'],
  },
  {
    id: 'un-camp-supplies',
    title: 'UN Refugee Camp Infrastructure',
    category: 'Infrastructure',
    client: 'IOM Sudan',
    year: '2021',
    location: 'Darfur, Sudan',
    shortDesc: 'Emergency shelter and utilities supply for 15,000-person refugee camp.',
    fullDesc:
      'ENVIRON managed the procurement, logistics, and installation of complete camp infrastructure for a major humanitarian operation in Darfur. This included solar-powered lighting, water supply systems, modular shelters, and communications infrastructure — all delivered within a 6-week emergency timeline.',
    technologies: ['Solar Lighting', 'Water Systems', 'Logistics', 'Modular Shelter'],
    images: ['/project-1.jpg', '/project-3.jpg'],
  },
]
