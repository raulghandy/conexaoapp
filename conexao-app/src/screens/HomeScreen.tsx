import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing, radius, MAX_FONT_SCALE } from '../theme';
import { getCurrentConnection } from '../api/connectionService';
import { useFetch } from '../hooks/useFetch';
import { RootTabParamList } from '../navigation/types';
import { announce } from '../utils/a11y';
import { formatEyebrowDate, formatUpdatedToday } from '../utils/formatters';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { ErrorCard } from '../components/common/ErrorCard';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { SectionHeading } from '../components/common/SectionHeading';
import { Skeleton } from '../components/common/Skeleton';
import { HeroCard } from '../components/home/HeroCard';
import { MetricCard } from '../components/home/MetricCard';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { data, loading, error, reload } = useFetch(getCurrentConnection);

  // Avisa o leitor de tela quando os dados terminam de carregar.
  useEffect(() => {
    if (!loading && !error && data) {
      announce(`Dados atualizados. ${data.headline}.`);
    }
  }, [loading, error, data]);

  if (loading) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="SUA REDE" title="Atualizando…" />
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Carregando os dados atuais da rede"
          accessibilityState={{ busy: true }}
        >
          <Skeleton height={268} borderRadius={radius.xl} />
          <View style={styles.grid}>
            {[0, 1].map((i) => (
              <View key={i} style={styles.cell}>
                <Skeleton height={157} />
              </View>
            ))}
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !data) {
    return (
      <ScreenContainer>
        <ScreenHeader eyebrow="SUA REDE" title="Conexão agora" />
        <ErrorCard onRetry={reload} retryHint="Carrega os dados da conexão novamente" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader
        eyebrow={formatEyebrowDate(new Date())}
        title={`Olá, ${data.userName}`}
        subtitle="Previsão da sua conexão para este momento."
        info="Esta tela mostra a previsão da sua conexão para este momento, calculada a partir do ponto de medição mais próximo."
      />

      <HeroCard
        level={data.level}
        headline={data.headline}
        description={data.description}
        onExplore={() => navigation.navigate('Details')}
      />

      <SectionHeading title="Métricas principais" right="Previsão" />
      <View style={styles.grid}>
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </View>

      <Text style={styles.note} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {data.note}
      </Text>

      <View style={styles.updateRow}>
        <View
          style={styles.updateTexts}
          accessible
          accessibilityLabel={`Dados atualizados. ${formatUpdatedToday(data.updatedAt)}`}
        >
          <Text style={styles.updateTitle} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            Dados atualizados
          </Text>
          <Text style={styles.updateWhen} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {formatUpdatedToday(data.updatedAt)}
          </Text>
        </View>
        <AccessibleButton
          title="Atualizar"
          icon="refresh"
          hint="Busca novamente os dados da sua conexão"
          onPress={reload}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  note: { ...typography.caption, fontWeight: '400', color: colors.textMuted, marginTop: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  cell: { flexGrow: 1, flexBasis: '45%' },
  updateRow: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingLeft: spacing.lg,
    paddingRight: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  updateTexts: { flex: 1, gap: 3 },
  updateTitle: { ...typography.label, color: colors.text },
  updateWhen: { ...typography.caption, fontWeight: '400', color: colors.textMuted },
});
