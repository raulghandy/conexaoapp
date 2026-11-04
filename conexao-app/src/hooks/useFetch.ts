import { useEffect, useState } from 'react';

// Carrega dados de uma função assíncrona e informa se está carregando ou deu erro.
// Importante: a função `fetcher` precisa ser estável (função do módulo ou useCallback),
// senão o efeito roda de novo a cada renderização.
//
// Não há atualização automática por timer de propósito: conteúdo que muda sozinho
// exige um jeito de pausar (WCAG 2.2.2). Atualizar é sempre uma ação do usuário.
export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false; // evita atualizar o estado se a tela foi fechada ou a busca ficou velha

    setLoading(true);
    setError(false);

    fetcher()
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch(() => {
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [fetcher, attempt]);

  const reload = () => setAttempt((n) => n + 1);

  return { data, loading, error, reload };
}
