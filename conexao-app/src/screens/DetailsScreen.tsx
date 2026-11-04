import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import { getStabilityReport } from '../api/connectionService';
import { useFetch } from '../hooks/useFetch';
import { announce } from '../utils/a11y';
import { ErrorCard } from '../components/common/ErrorCard';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { Skeleton } from '../components/common/Skeleton';
import { MetricDetailCard } from '../components/details/MetricDetailCard';
import { StabilityChart } from '../components/details/StabilityChart';

export default function DetailsScreen() {
  const { data, loading, error, reload } = useFetch(getStabilityReport);

  useEffect(() => {
    if (!loading && !error && data) {
      announce(`Detalhes carregados. ${data.percent}% estável.`);
    }
  }, [loading, error, data]);

  if (loading) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="ENTENDA SUA REDE" title="Detalhes" />
        <View
          style={styles.list}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Carregando os detalhes da conexão"
          accessibilityState={{ busy: true }}
        >
          <Skeleton height={230} borderRadius={24} />
          <Skeleton height={110} />
          <Skeleton height={110} />
        </View>
      </ScreenContainer>
    );
  }

  if (error || !data) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="ENTENDA SUA REDE" title="Detalhes" />
        <ErrorCard onRetry={reload} retryHint="Carrega os detalhes novamente" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader
        eyebrow="ENTENDA SUA REDE"
        title="Detalhes"
        subtitle="Números traduzidos para o seu dia a dia."
        info="Aqui você vê a estabilidade prevista para as próximas horas e o que cada medição significa."
      />

      <StabilityChart report={data} />

      <View style={[styles.list, styles.metrics]} accessibilityRole="list">
        {data.metrics.map((metric, index) => (
          <MetricDetailCard key={metric.id} metric={metric} index={index} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { gap: 11 },
  metrics: { marginTop: spacing.xl - 4 },
});
