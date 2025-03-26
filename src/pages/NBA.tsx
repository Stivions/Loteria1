import React, { useState, useEffect } from 'react';
import { Calendar, Search, Loader2 } from 'lucide-react';
import { obtenerPartidosNBA, type NBAGame } from '../services/nbaService';
import { format } from 'date-fns';
import AdBanner from '../components/AdBanner';

const NBA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [games, setGames] = useState<NBAGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPartidos = async () => {
      setLoading(true);
      setError(null);
      try {
        const partidos = await obtenerPartidosNBA(selectedDate);
        setGames(partidos);
      } catch (err) {
        setError('Error al cargar los partidos. Por favor, intente nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarPartidos();
  }, [selectedDate]);

  const gamesFiltrados = games.filter(game =>
    game.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGameStatus = (status: string) => {
    switch (status) {
      case 'Final':
        return 'Finalizado';
      case 'In Progress':
        return 'En Curso';
      case 'Scheduled':
        return 'Programado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Resultados NBA</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar equipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <AdBanner slot="1357924680" format="horizontal" className="my-4" />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600">Cargando partidos...</span>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Juegos del {format(new Date(selectedDate), 'dd/MM/yyyy')}
            </h2>
            <div className="space-y-4">
              {gamesFiltrados.length > 0 ? (
                gamesFiltrados.map((game, index) => (
                  <React.Fragment key={game.id}>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3 w-full">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-600">
                              {getGameStatus(game.status)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {game.arena.name}, {game.arena.city}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <img src={game.awayTeam.logo} alt={game.awayTeam.name} className="w-8 h-8 mr-2" />
                                <p className="font-medium">{game.awayTeam.name}</p>
                              </div>
                              <p className="text-2xl font-bold">{game.awayTeam.score}</p>
                            </div>
                            <div className="px-4 text-gray-400">VS</div>
                            <div className="flex-1 text-right">
                              <div className="flex items-center justify-end">
                                <p className="font-medium">{game.homeTeam.name}</p>
                                <img src={game.homeTeam.logo} alt={game.homeTeam.name} className="w-8 h-8 ml-2" />
                              </div>
                              <p className="text-2xl font-bold">{game.homeTeam.score}</p>
                            </div>
                          </div>
                          {game.status === 'In Progress' && (
                            <div className="text-center text-sm text-gray-600">
                              Periodo {game.period}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index % 3 === 2 && <AdBanner slot="2468013579" format="rectangle" className="my-4" />}
                  </React.Fragment>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay juegos programados para esta fecha
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AdBanner slot="9876543210" format="horizontal" className="my-4" />
    </div>
  );
};

export default NBA;