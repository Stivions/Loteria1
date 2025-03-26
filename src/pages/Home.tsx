import React from 'react';
import { motion } from 'framer-motion';
import { Baseline as Baseball, ShoppingBasket as Basketball, Trophy, Ticket } from 'lucide-react';
import FloatingIcon from '../components/3d/FloatingIcon';
import AdBanner from '../components/AdBanner';

const Home = () => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <header className="text-center py-16">
        <motion.h1 
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Deportes & Loterías RD
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Resultados en tiempo real de MLB, NBA y loterías dominicanas
        </motion.p>
      </header>

      <AdBanner slot="1234567890" format="horizontal" className="my-8" />

      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div 
          className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16">
              <FloatingIcon icon="⚾" color="#2563EB" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">MLB</h2>
          </div>
          <p className="text-gray-600">
            Resultados y estadísticas de béisbol en vivo
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16">
              <FloatingIcon icon="🏀" color="#EA580C" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">NBA</h2>
          </div>
          <p className="text-gray-600">
            Sigue a tus jugadores dominicanos favoritos
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16">
              <FloatingIcon icon="🎲" color="#059669" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">Loterías</h2>
          </div>
          <p className="text-gray-600">
            Resultados diarios de todas las loterías
          </p>
        </motion.div>
      </motion.div>

      <AdBanner slot="0987654321" format="rectangle" className="my-8" />

      <motion.div 
        className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 backdrop-blur-sm rounded-3xl p-12 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center mb-8">
          <Trophy className="w-12 h-12 text-blue-600" />
          <h2 className="text-3xl font-bold ml-4 text-gray-800">Lo Más Destacado</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Estadísticas en Vivo</h3>
            <p className="text-gray-600">Datos actualizados al instante de todos los eventos deportivos.</p>
          </div>
          <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Resultados Verificados</h3>
            <p className="text-gray-600">Información confiable y verificada de todas las loterías.</p>
          </div>
          <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Historial Completo</h3>
            <p className="text-gray-600">Accede al archivo histórico de resultados y estadísticas.</p>
          </div>
        </div>
      </motion.div>

      <AdBanner slot="1357924680" format="horizontal" className="my-8" />
    </div>
  );
}

export default Home;