export interface MLBTeam {
  id: number;
  name: string;
  teamName: string;
  abbreviation: string;
  locationName: string;
  division: {
    id: number;
    name: string;
  };
  league: {
    id: number;
    name: string;
  };
}

export interface MLBVenue {
  id: number;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  timeZone: {
    id: string;
    offset: number;
  };
}

export interface MLBGame {
  gamePk: number;
  gameDate: string;
  status: {
    abstractGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
  };
  teams: {
    away: {
      leagueRecord: {
        wins: number;
        losses: number;
        pct: string;
      };
      score: number;
      team: {
        id: number;
        name: string;
      };
      isWinner: boolean;
    };
    home: {
      leagueRecord: {
        wins: number;
        losses: number;
        pct: string;
      };
      score: number;
      team: {
        id: number;
        name: string;
      };
      isWinner: boolean;
    };
  };
  venue: {
    id: number;
    name: string;
  };
  content: {
    link: string;
  };
  gameNumber: number;
  doubleHeader: string;
  gamedayType: string;
  tiebreaker: string;
  calendarEventID: string;
  seasonDisplay: string;
  dayNight: string;
  scheduledInnings: number;
  gamesInSeries: number;
  seriesGameNumber: number;
  seriesDescription: string;
}

export interface MLBGameContent {
  highlights: {
    highlights: {
      items: Array<{
        type: string;
        title: string;
        description: string;
        url: string;
        playbacks: Array<{
          url: string;
          playbackType: string;
        }>;
      }>;
    };
  };
}

async function fetchMLBApi(path: string, params: string = '') {
  try {
    const url = `/api/mlb-proxy`;
    console.log('Fetching MLB data:', path, params);
    
    const response = await fetch(`${url}?path=${encodeURIComponent(path)}&params=${encodeURIComponent(params)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('MLB API Error:', errorData);
      throw new Error(`Error en la petición a la API de MLB: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('MLB API Request Error:', error);
    throw new Error(`Error al conectar con la API de MLB: ${error.message}`);
  }
}

export async function obtenerPartidosMLB(fecha?: string): Promise<MLBGame[]> {
  try {
    const params = fecha ? 
      `sportId=1&startDate=${fecha}&endDate=${fecha}&hydrate=team,venue,stats,probablePitcher,flags` :
      'sportId=1&hydrate=team,venue,stats,probablePitcher,flags';

    const data = await fetchMLBApi('/schedule/games/', params);
    return data.dates?.[0]?.games || [];
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    throw error;
  }
}

export async function obtenerEquipoMLB(teamId: number): Promise<MLBTeam> {
  try {
    const data = await fetchMLBApi(`/teams/${teamId}`, 'hydrate=division,league');
    return data.teams[0];
  } catch (error) {
    console.error('Error al obtener equipo:', error);
    throw error;
  }
}

export async function obtenerVenue(venueId: number): Promise<MLBVenue> {
  try {
    const data = await fetchMLBApi(`/venues/${venueId}`);
    return data.venues[0];
  } catch (error) {
    console.error('Error al obtener venue:', error);
    throw error;
  }
}

export async function obtenerContenidoJuego(gameId: number): Promise<MLBGameContent> {
  try {
    return await fetchMLBApi(`/game/${gameId}/content`);
  } catch (error) {
    console.error('Error al obtener contenido del juego:', error);
    throw error;
  }
}

export async function obtenerTodosLosEquipos(): Promise<MLBTeam[]> {
  try {
    const data = await fetchMLBApi('/teams', 'hydrate=division,league');
    return data.teams;
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    throw error;
  }
}

export async function obtenerTodosLosVenues(): Promise<MLBVenue[]> {
  try {
    const data = await fetchMLBApi('/venues');
    return data.venues;
  } catch (error) {
    console.error('Error al obtener venues:', error);
    throw error;
  }
}