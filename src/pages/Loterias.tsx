import React, { useState, useEffect } from 'react';
import { Calendar, Search, Ticket, Clock, Loader2 } from 'lucide-react';
import { ResultadoLoteria, obtenerTodasLasLoterias } from '../services/loteriasService';
import { LOTERIAS_DATA, LoteriaData } from '../data/loterias';
import AdBanner from '../components/AdBanner';

interface LoteriaState extends LoteriaData {
  resultados: ResultadoLoteria[];
}

const Loterias = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tipoFiltro, setTipoFiltro] = useState<'todas' | 'quiniela' | 'loto'>('todas');
  const [loterias, setLoterias] = useState<LoteriaState[]>(
    LOTERIAS_DATA.map(loteria => ({ ...loteria, resultados: [] }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarResultados = async () => {
      setLoading(true);
      setError(null);
      try {
        const fechaFormateada = selectedDate.split('-').reverse().join('-');
        const resultados = await obtenerTodasLasLoterias(fechaFormateada);
        
        setLoterias(prev => prev.map(loteria => {
          const resultadoLoteria = resultados.find(r => 
            r.name.toLowerCase() === loteria.nombre.toLowerCase()
          );
          
          if (resultadoLoteria) {
            return {
              ...loteria,
              resultados: [{
                id: resultadoLoteria.id,
                name: resultadoLoteria.name,
                fecha: resultadoLoteria.date,
                numeros: resultadoLoteria.numbers.split('-')
              }]
            };
          }
          return loteria;
        }));
      } catch (err) {
        setError('Error al cargar los resultados. Por favor, intente nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarResultados();
  }, [selectedDate]);

  const loteriasFiltradas = loterias.filter(loteria => {
    const cumpleBusqueda = loteria.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleTipo = tipoFiltro === 'todas' || loteria.tipo === tipoFiltro;
    return cumpleBusqueda && cumpleTipo;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Loterías Dominicanas</h1>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar lotería..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="todas">Todas las loterías</option>
            <option value="quiniela">Quinielas</option>
            <option value="loto">Lotos</option>
          </select>
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
          <span className="ml-2 text-gray-600">Cargando resultados...</span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loteriasFiltradas.map((loteria, index) => (
            <React.Fragment key={loteria.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Ticket className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-semibold ml-2">{loteria.nombre}</h2>
                    </div>
                    <span className="text-sm text-blue-600 font-medium capitalize">{loteria.tipo}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">Horarios de sorteos:</h3>
                    <div className="flex flex-wrap gap-2">
                      {loteria.horarios.map((horario, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{horario}</span>
                        </div>
                      ))}
                    </div>
                    {loteria.resultados?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Resultados del día:</h3>
                        {loteria.resultados.map((resultado, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">{resultado.name}</span>
                              <span className="text-sm font-medium text-blue-600">{resultado.fecha}</span>
                            </div>
                            <div className="flex gap-2">
                              {resultado.numeros.map((numero, i) => (
                                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                  {numero}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {index % 6 === 5 && <AdBanner slot="2468013579" format="rectangle" className="col-span-3 my-4" />}
            </React.Fragment>
          ))}
        </div>
      )}

      <AdBanner slot="9876543210" format="horizontal" className="my-4" />
    </div>
  );
};

export default Loterias;