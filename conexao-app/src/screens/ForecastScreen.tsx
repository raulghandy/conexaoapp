import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import { getForecast } from '../api/connectionService';
import { useFetch } from '../hooks/useFetch';
import { announce } from '../utils/a11y';
import { formatClock } from '../utils/formatters';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorCard } from '../components/common/ErrorCard';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { SectionHeading } from '../components/common/SectionHeading';
import { Skeleton } from '../components/common/Skeleton';
import { BestWindowCard } from '../components/forecast/BestWindowCard';
import { TimelineItem } from '../components/forecast/TimelineItem';

export default function ForecastScreen() {
  const { data, loading, error, reload } = useFetch(getForecast);

  useEffect(() => {
    if (!loading && !error && data) {
      announce(`Previsão carregada. Melhor janela: ${data.bestWindow.label}.`);
    }
  }, [loading, error, data]);

  if (loading) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="PRÓXIMAS HORAS" title="Sua previsão" />
        <View
          style={styles.list}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Carregando a previsão"
          accessibilityState={{ busy: true }}
        >
          <Skeleton height={96} />
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} height={128} borderRadius={19} />
          ))}
        </View>
      </ScreenContainer>
    );
  }

  if (error || !data) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="PRÓXIMAS HORAS" title="Sua previsão" />
        <ErrorCard onRetry={reload} retryHint="Carrega a previsão novamente" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader
        eyebrow="PRÓXIMAS HORAS"
        title="Sua previsão"
        subtitle="Planeje o que importa com mais confiança."
        info="Aqui estão as previsões da conexão para as próximas horas, com a atividade mais indicada para cada uma."
      />

      <BestWindowCard label={data.bestWindow.label} note={data.bestWindow.note} />

      <SectionHeading title="Próximas horas" right={`Atualizado às ${formatClock(data.updatedAt)}`} />

      <View accessibilityRole="list">
        {data.items.map((item, index) => (
          <TimelineItem key={item.id} item={item} isLast={index === data.items.length - 1} />
        ))}
      </View>

      {/* Fim da lista */}
      <View style={styles.end}>
        <EmptyState />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  end: { marginTop: spacing.lg },
});
