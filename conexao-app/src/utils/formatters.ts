// Formatação manual (sem Intl) para ter o mesmo resultado em qualquer dispositivo.
const WEEKDAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** "TERÇA, 18 DE JUNHO" */
export function formatEyebrowDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`.toUpperCase();
}

/** "14:32" */
export function formatClock(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "Hoje, às 14:32" */
export function formatUpdatedToday(iso: string): string {
  return `Hoje, às ${formatClock(iso)}`;
}
