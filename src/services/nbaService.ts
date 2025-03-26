export interface NBATeam {
  id: number;
  name: string;
  nickname: string;
  city: string;
  logo: string;
  conference: string;
  division: string;
}

export interface NBAGame {
  id: number;
  date: string;
  status: string;
  period: number;
  homeTeam: {
    id: number;
    name: string;
    score: number;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    score: number;
    logo: string;
  };
  arena: {
    name: string;
    city: string;
    state: string;
  };
}

export interface NBAPlayer {
  id: number;
  firstName: string;
  lastName: string;
  teamId: number;
  position: string;
  jersey: string;
  isActive: boolean;
}

async function fetchNBAApi(path: string, params: string = '') {
  try {
    const url = `/api/nba-proxy`;
    console.log('Fetching NBA data:', path, params);
    
    const response = await fetch(`${url}?path=${encodeURIComponent(path)}&params=${encodeURIComponent(params)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('NBA API Error:', errorData);
      throw new Error(`Error en la petición a la API de NBA: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('NBA API Request Error:', error);
    throw new Error(`Error al conectar con la API de NBA: ${error.message}`);
  }
}

export async function obtenerPartidosNBA(fecha: string): Promise<NBAGame[]> {
  try {
    const data = await fetchNBAApi('/games', `date=${fecha}`);
    return data.games || [];
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    throw error;
  }
}

export async function obtenerEquipoNBA(teamId: number): Promise<NBATeam> {
  try {
    const data = await fetchNBAApi(`/teams/${teamId}`);
    return data.team;
  } catch (error) {
    console.error('Error al obtener equipo:', error);
    throw error;
  }
}

export async function obtenerJugadoresEquipo(teamId: number): Promise<NBAPlayer[]> {
  try {
    const data = await fetchNBAApi(`/teams/${teamId}/players`);
    return data.players || [];
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    throw error;
  }
}

export async function obtenerTodosLosEquipos(): Promise<NBATeam[]> {
  try {
    const data = await fetchNBAApi('/teams');
    return data.teams || [];
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    throw error;
  }
}