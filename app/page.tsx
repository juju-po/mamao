'use client';

import { useState, FormEvent } from 'react';

interface Jogador {
  id: number;
  name: string;
  gols: number;
  assistencias: number;
  posicao: string;
}

export default function Home() {
  const [nome, setNome] = useState('');
  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarJogador = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setJogador(null);

    try {
      const response = await fetch(`/api/jogador?nome=${encodeURIComponent(nome)}`);
      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || 'Erro ao buscar jogador');
      } else {
        setJogador(data);
      }
    } catch (err) {
      setErro('Erro na conexão com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1579952363873-27f3bade9e55?w=1200&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <main className="relative w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            ⚽ Buscar Jogador
          </h1>
          <p className="text-center text-gray-600">
            Encontre informações sobre seus jogadores favoritos
          </p>
        </div>

        <form onSubmit={buscarJogador} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Jogador
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Bruxo, Bruno, Zico..."
              className="w-full px-4 py-2 border-2 border-purple-400 bg-purple-50 text-purple-900 placeholder-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6"
          >
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {erro && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">❌ Erro</p>
            <p>{erro}</p>
          </div>
        )}

        {jogador && (
          <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{jogador.name}</h2>
              <p className="text-blue-600 font-semibold text-lg">{jogador.posicao}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Gols</p>
                <p className="text-3xl font-bold text-blue-600">{jogador.gols}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Assistências</p>
                <p className="text-3xl font-bold text-green-600">{jogador.assistencias}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">ID:</span> {jogador.id}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
