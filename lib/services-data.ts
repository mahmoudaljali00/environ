export interface ServiceData {
  id: string
  title: string
  shortDesc: string
  fullDesc: string
  benefits: string[]
  image: string
  color: string
}

export const servicesData: ServiceData[] = [
  {
    id: 'engineering',
    title: 'Engineering Services',
    shortDesc: 'Comprehensive design, planning, and execution of complex engineering projects.',
    fullDesc:
      'ENVIRON delivers end-to-end engineering services covering structural, civil, and systems engineering. From feasibility studies and detailed design through to commissioning and handover, our licensed engineers bring international best practices to every project. We serve government, commercial, and industrial clients across East Africa.',
    benefits: [
      'Detailed engineering design and documentation',
      'Feasibility and technical assessments',
      'Project management and supervision',
      'Quality control and commissioning',
      'As-built drawings and O&M manuals',
    ],
    image: '/project-2.jpg',
    color: '#009d8e',
  },
  {
    id: 'energy',
    title: 'Energy Solutions',
    shortDesc: 'Solar systems, generators, and renewable energy infrastructure.',
    fullDesc:
      'Our energy division provides complete design, supply, and installation of solar PV systems ranging from residential rooftop to utility-scale farms. We also supply and maintain diesel and gas generators for reliable backup power — essential in Sudan\'s growing infrastructure landscape.',
    benefits: [
      'Solar PV design and installation (1kW – 5MW+)',
      'Generator supply, installation, and maintenance',
      'Hybrid solar-diesel systems',
      'Energy auditing and optimization',
      'Grid-tie and off-grid solutions',
    ],
    image: '/project-1.jpg',
    color: '#ebb720',
  },
  {
    id: 'hvac',
    title: 'Air Conditioning Systems',
    shortDesc: 'Industrial and residential HVAC design, supply, and maintenance.',
    fullDesc:
      'ENVIRON is an authorized installer and service provider for leading HVAC brands. We design climate control solutions for hospitals, hotels, offices, and industrial facilities — ensuring thermal comfort and air quality standards are met. Our team is trained in VRF, chiller, and precision cooling systems.',
    benefits: [
      'Full HVAC design using international standards',
      'VRF, chilled water, and split systems',
      'Cleanroom and precision air conditioning',
      'Preventive maintenance contracts',
      'Energy-efficient upgrade programs',
    ],
    image: '/project-3.jpg',
    color: '#5dc4b8',
  },
  {
    id: 'mep',
    title: 'MEP Services',
    shortDesc: 'Mechanical, electrical, and plumbing systems for all building types.',
    fullDesc:
      'Our MEP division handles all building services from schematic through to installation and handover. We coordinate mechanical, electrical, and plumbing disciplines in a fully integrated approach, reducing clashes and delivery time. We serve high-rise commercial, residential, healthcare, and industrial sectors.',
    benefits: [
      'BIM-coordinated MEP design',
      'Electrical LV and MV systems',
      'Plumbing, drainage, and firefighting',
      'Building management systems (BMS)',
      'Commissioning and testing',
    ],
    image: '/project-2.jpg',
    color: '#009d8e',
  },
  {
    id: 'water',
    title: 'Water Pump Systems',
    shortDesc: 'Water supply, pumping stations, and distribution networks.',
    fullDesc:
      'We design and install water infrastructure from borehole pump sets to municipal distribution networks. Our water engineering team understands the unique challenges of arid environments and provides durable, efficient solutions that maximize uptime and minimize maintenance costs.',
    benefits: [
      'Borehole and surface pump systems',
      'Submersible and centrifugal pumps',
      'Water treatment and purification',
      'Distribution network design',
      'SCADA and remote monitoring',
    ],
    image: '/project-1.jpg',
    color: '#007a6e',
  },
  {
    id: 'security',
    title: 'Low Current & Security Systems',
    shortDesc: 'CCTV, access control, fire alarm, and structured cabling systems.',
    fullDesc:
      'ENVIRON designs and installs comprehensive security and low current systems for commercial, government, and residential clients. From IP CCTV surveillance and biometric access control to voice/data cabling and public address systems — we provide end-to-end solutions with ongoing maintenance support.',
    benefits: [
      'IP CCTV and video analytics',
      'Access control and biometrics',
      'Addressable fire alarm systems',
      'Structured cabling (CAT6/fiber)',
      'Public address and intercom systems',
    ],
    image: '/project-3.jpg',
    color: '#ebb720',
  },
  {
    id: 'contracting',
    title: 'Contracting & Consultancy',
    shortDesc: 'Full project management, supervision, and technical consultancy.',
    fullDesc:
      'ENVIRON acts as prime contractor and technical consultant on complex multi-discipline projects. Our project managers hold PMP certifications and follow PMI/FIDIC standards. We provide independent technical reviews, owner\'s engineer services, and construction supervision for major infrastructure programs.',
    benefits: [
      'Owner\'s engineer and PMC services',
      'FIDIC contract administration',
      'Technical due diligence and audits',
      'Construction supervision',
      'Value engineering and cost control',
    ],
    image: '/about-hero.jpg',
    color: '#009d8e',
  },
  {
    id: 'trading',
    title: 'Trading Services',
    shortDesc: 'Refugee camp supplies, procurement, logistics, and customized solutions.',
    fullDesc:
      'Our trading division specializes in procurement, logistics, and supply chain management for humanitarian operations, government agencies, and commercial clients. We have extensive experience supplying UN agencies and NGOs with camp materials, equipment, and critical infrastructure components across challenging environments.',
    benefits: [
      'UN/NGO emergency supply procurement',
      'Shelter and camp infrastructure materials',
      'Customs clearance and logistics',
      'Last-mile delivery in remote areas',
      'Customized procurement solutions',
    ],
    image: '/project-1.jpg',
    color: '#5dc4b8',
  },
]
