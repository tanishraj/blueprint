import { OrgChartNodeData } from './types';

export const initialData: OrgChartNodeData[] = [
  {
    id: '1',
    parentId: null,
    name: 'Ian Malcolm',
    position: 'Chief Executive Officer',
  },

  // --- LEVEL 2: DEPARTMENT HEADS ---
  { id: '2', parentId: '1', name: 'Alan Grant', position: 'VP of Engineering' },
  {
    id: '3',
    parentId: '1',
    name: 'Ellie Sattler',
    position: 'VP of Operations',
  },
  {
    id: '4',
    parentId: '1',
    name: 'John Hammond',
    position: 'VP of Product Management',
  },
  {
    id: '5',
    parentId: '1',
    name: 'Sarah Harding',
    position: 'VP of Marketing',
  },
  { id: '6', parentId: '1', name: 'Nick Van Owen', position: 'VP of Finance' },
  {
    id: '7',
    parentId: '1',
    name: 'Robert Muldoon',
    position: 'VP of Human Resources',
  },
  { id: '8', parentId: '1', name: 'Ray Arnold', position: 'VP of Legal' },

  // --- LEVEL 3: ENGINEERING TEAM (Reports to id: 2) ---
  {
    id: '9',
    parentId: '2',
    name: 'Tim Murphy',
    position: 'Senior Engineering Specialist',
  },
  {
    id: '10',
    parentId: '2',
    name: 'Lex Murphy',
    position: 'Senior Engineering Specialist',
  },
  {
    id: '11',
    parentId: '2',
    name: 'Dennis Nedry',
    position: 'Engineering Associate',
  },
  {
    id: '12',
    parentId: '2',
    name: 'Henry Wu',
    position: 'Engineering Associate',
  },
  {
    id: '13',
    parentId: '2',
    name: 'Peter Ludlow',
    position: 'Engineering Associate',
  },
  {
    id: '14',
    parentId: '2',
    name: 'Roland Tembo',
    position: 'Engineering Associate',
  },

  // --- LEVEL 3: OPERATIONS TEAM (Reports to id: 3) ---
  {
    id: '15',
    parentId: '3',
    name: 'Ajay Sidhu',
    position: 'Senior Operations Specialist',
  },
  {
    id: '16',
    parentId: '3',
    name: 'Carter',
    position: 'Senior Operations Specialist',
  },
  {
    id: '17',
    parentId: '3',
    name: 'Dieter Stark',
    position: 'Operations Associate',
  },
  {
    id: '18',
    parentId: '3',
    name: 'Robert Burke',
    position: 'Operations Associate',
  },
  {
    id: '19',
    parentId: '3',
    name: 'Billy Brennan',
    position: 'Operations Associate',
  },
  {
    id: '20',
    parentId: '3',
    name: 'Paul Kirby',
    position: 'Operations Associate',
  },

  // --- LEVEL 3: PRODUCT MANAGEMENT TEAM (Reports to id: 4) ---
  {
    id: '21',
    parentId: '4',
    name: 'Amanda Kirby',
    position: 'Senior Product Management Specialist',
  },
  {
    id: '22',
    parentId: '4',
    name: 'Eric Kirby',
    position: 'Senior Product Management Specialist',
  },
  {
    id: '23',
    parentId: '4',
    name: 'Ben Hildebrand',
    position: 'Product Management Associate',
  },
  {
    id: '24',
    parentId: '4',
    name: 'Owen Grady',
    position: 'Product Management Associate',
  },
  {
    id: '25',
    parentId: '4',
    name: 'Claire Dearing',
    position: 'Product Management Associate',
  },
  {
    id: '26',
    parentId: '4',
    name: 'Simon Masrani',
    position: 'Product Management Associate',
  },

  // --- LEVEL 3: MARKETING TEAM (Reports to id: 5) ---
  {
    id: '27',
    parentId: '5',
    name: 'Vic Hoskins',
    position: 'Senior Marketing Specialist',
  },
  {
    id: '28',
    parentId: '5',
    name: 'Lowery Cruthers',
    position: 'Senior Marketing Specialist',
  },
  {
    id: '29',
    parentId: '5',
    name: 'Vivian Krill',
    position: 'Marketing Associate',
  },
  {
    id: '30',
    parentId: '5',
    name: 'Barry Sembène',
    position: 'Marketing Associate',
  },
  {
    id: '31',
    parentId: '5',
    name: 'Zara Young',
    position: 'Marketing Associate',
  },
  { id: '32', parentId: '5', name: 'Hamada', position: 'Marketing Associate' },

  // --- LEVEL 3: FINANCE TEAM (Reports to id: 6) ---
  {
    id: '33',
    parentId: '6',
    name: 'Franklin Webb',
    position: 'Senior Finance Specialist',
  },
  {
    id: '34',
    parentId: '6',
    name: 'Zia Rodriguez',
    position: 'Senior Finance Specialist',
  },
  { id: '35', parentId: '6', name: 'Eli Mills', position: 'Finance Associate' },
  {
    id: '36',
    parentId: '6',
    name: 'Gunnar Eversoll',
    position: 'Finance Associate',
  },
  {
    id: '37',
    parentId: '6',
    name: 'Ken Wheatley',
    position: 'Finance Associate',
  },
  {
    id: '38',
    parentId: '6',
    name: 'Iris Carroll',
    position: 'Finance Associate',
  },

  // --- LEVEL 3: HUMAN RESOURCES TEAM (Reports to id: 7) ---
  {
    id: '39',
    parentId: '7',
    name: 'Maisie Lockwood',
    position: 'Senior HR Specialist',
  },
  {
    id: '40',
    parentId: '7',
    name: 'Benjamin Lockwood',
    position: 'Senior HR Specialist',
  },
  {
    id: '41',
    parentId: '7',
    name: 'Kayla Watts',
    position: 'Human Resources Associate',
  },
  {
    id: '42',
    parentId: '7',
    name: 'Ramsay Cole',
    position: 'Human Resources Associate',
  },
  {
    id: '43',
    parentId: '7',
    name: 'Soyona Santos',
    position: 'Human Resources Associate',
  },
  {
    id: '44',
    parentId: '7',
    name: 'Rainn Delacourt',
    position: 'Human Resources Associate',
  },

  // --- LEVEL 3: LEGAL TEAM (Reports to id: 8) ---
  {
    id: '45',
    parentId: '8',
    name: 'Lewis Dodgson',
    position: 'Senior Legal Specialist',
  },
  {
    id: '46',
    parentId: '8',
    name: 'Alan Grant Jr.',
    position: 'Senior Legal Specialist',
  },
  {
    id: '47',
    parentId: '8',
    name: 'Gerry Harding',
    position: 'Legal Associate',
  },
  { id: '48', parentId: '8', name: 'Hardy', position: 'Legal Associate' },
  { id: '49', parentId: '8', name: 'Barney', position: 'Legal Associate' },
  { id: '50', parentId: '8', name: 'Sarah', position: 'Legal Associate' },
];
