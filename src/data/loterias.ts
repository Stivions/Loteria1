export interface LoteriaData {
  id: string;
  nombre: string;
  horarios: string[];
  tipo: 'quiniela' | 'pale' | 'tripleta' | 'loto';
}

export const LOTERIAS_DATA: LoteriaData[] = [
  {
    id: '1',
    nombre: 'La Primera Día',
    horarios: ['12:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '2',
    nombre: 'Anguila Mañana',
    horarios: ['10:00 AM'],
    tipo: 'quiniela'
  },
  {
    id: '3',
    nombre: 'Lotería Nacional',
    horarios: ['12:30 PM', '6:00 PM', '9:00 PM'],
    tipo: 'quiniela'
  },
  {
    id: '4',
    nombre: 'Leidsa',
    horarios: ['8:55 PM'],
    tipo: 'loto'
  },
  {
    id: '5',
    nombre: 'Real',
    horarios: ['12:30 PM', '7:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '6',
    nombre: 'La Primera Noche',
    horarios: ['7:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '7',
    nombre: 'Anguila Tarde',
    horarios: ['2:00 PM'],
    tipo: 'quiniela'
  },
  {
    id: '8',
    nombre: 'Anguila Noche',
    horarios: ['8:00 PM'],
    tipo: 'quiniela'
  },
  {
    id: '9',
    nombre: 'Loteka',
    horarios: ['12:55 PM', '7:55 PM'],
    tipo: 'quiniela'
  },
  {
    id: '10',
    nombre: 'La Suerte',
    horarios: ['12:30 PM', '6:00 PM'],
    tipo: 'quiniela'
  },
  {
    id: '11',
    nombre: 'King Lottery',
    horarios: ['10:30 AM', '2:30 PM', '8:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '12',
    nombre: 'Loto Pool',
    horarios: ['9:00 PM'],
    tipo: 'loto'
  },
  {
    id: '13',
    nombre: 'Loto Real',
    horarios: ['8:30 PM'],
    tipo: 'loto'
  },
  {
    id: '14',
    nombre: 'Florida Día',
    horarios: ['1:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '15',
    nombre: 'Florida Noche',
    horarios: ['8:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '16',
    nombre: 'New York Tarde',
    horarios: ['2:30 PM'],
    tipo: 'quiniela'
  },
  {
    id: '17',
    nombre: 'New York Noche',
    horarios: ['10:30 PM'],
    tipo: 'quiniela'
  }
];