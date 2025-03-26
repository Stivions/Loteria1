export interface ResultadoLoteria {
  id?: string;
  name: string;
  numbers: string;
  date: string;
  created_at?: string;
}

async function fetchLotteryApi(lottery?: string, date?: string) {
  try {
    const url = `/api/lottery-proxy`;
    const params = new URLSearchParams();
    if (lottery) params.append('lottery', lottery);
    if (date) params.append('date', date);
    
    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Lottery API Error:', errorData);
      throw new Error(`Error en la petición a la API de loterías: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Lottery API Request Error:', error);
    throw new Error(`Error al conectar con la API de loterías: ${error.message}`);
  }
}

export async function obtenerTodasLasLoterias(fecha?: string): Promise<ResultadoLoteria[]> {
  try {
    const resultados = await fetchLotteryApi(undefined, fecha);
    return resultados;
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    throw error;
  }
}

export async function buscarLoteriaPorNombre(nombre: string): Promise<ResultadoLoteria[]> {
  try {
    const resultados = await fetchLotteryApi(nombre);
    return resultados;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}