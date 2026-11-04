import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing, radius, MAX_FONT_SCALE } from '../theme';
import { checkActivity, getPlanSlots } from '../api/connectionService';
import { ACTIVITIES, PERIODS } from '../constants/options';
import { useFetch } from '../hooks/useFetch';
import { RootTabParamList } from '../navigation/types';
import { ActivityId, PeriodId } from '../types/connection';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { ErrorCard } from '../components/common/ErrorCard';
import { Icon } from '../components/common/Icon';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { ActivityPicker } from '../components/plan/ActivityPicker';
import { PeriodPicker } from '../components/plan/PeriodPicker';
import { TimePicker } from '../components/plan/TimePicker';

type Props = BottomTabScreenProps<RootTabParamList, 'Plan'>;

// Título numerado de cada passo ("1 Selecione a atividade")
function Step({ number, title }: { number: number; title: string }) {
  return (
    <View
      style={styles.stepRow}
      accessible
      accessibilityRole="header"
      accessibilityLabel={`Passo ${number}: ${title}`}
    >
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {number}
        </Text>
      </View>
      <Text style={styles.stepTitle} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {title}
      </Text>
    </View>
  );
}

export default function PlanScreen({ navigation }: Props) {
  const [activity, setActivity] = useState<ActivityId>('video');
  const [period, setPeriod] = useState<PeriodId>('afternoon');
  const [time, setTime] = useState<string | null>(null);

  // Busca os horários de novo sempre que a atividade ou o período mudam.
  const fetchSlots = useCallback(() => getPlanSlots(activity, period), [activity, period]);
  const { data: slots, loading, error, reload } = useFetch(fetchSlots);

  // Quando os horários chegam, já deixa o melhor horário selecionado.
  useEffect(() => {
    if (slots && slots.length > 0) {
      const best = slots.find((slot) => slot.best) ?? slots[0];
      setTime(best.time);
    }
  }, [slots]);

  // Pergunta à API se a atividade serve para o horário escolhido.
  const slotIso = slots?.find((slot) => slot.time === time)?.iso ?? null;
  const fetchCheck = useCallback(
    () => (slotIso ? checkActivity(activity, slotIso) : Promise.resolve(null)),
    [activity, slotIso]
  );
  const { data: check } = useFetch(fetchCheck);
  const checkText = check ? `${check.suitable ? 'Adequado' : 'Não recomendado'}. ${check.message}` : '';

  const activityLabel = ACTIVITIES.find((item) => item.id === activity)?.label;
  const periodLabel = PERIODS.find((item) => item.id === period)?.label;
  const summary = time
    ? `${activityLabel} · ${periodLabel}, ${time}`
    : `${activityLabel} · ${periodLabel}`;

  return (
    <ScreenContainer>
      <ScreenHeader
        eyebrow="PLANEJE SEM SURPRESAS"
        title="O que você vai fazer?"
        subtitle="Escolha uma atividade e nós encontramos o melhor horário."
        info="Escolha o que você quer fazer e o período do dia. O app indica o melhor horário para isso."
      />

      <View style={styles.section}>
        <Step number={1} title="Selecione a atividade" />
        <ActivityPicker value={activity} onChange={setActivity} />
      </View>

      <View style={styles.section}>
        <Step number={2} title="Escolha o período" />
        <PeriodPicker value={period} onChange={setPeriod} />

        {loading ? (
          <Text
            style={styles.loading}
            accessibilityRole="progressbar"
            accessibilityLabel="Carregando horários"
            accessibilityState={{ busy: true }}
            maxFontSizeMultiplier={MAX_FONT_SCALE}
          >
            Carregando horários…
          </Text>
        ) : error ? (
          <View style={styles.error}>
            <ErrorCard
              title="Não foi possível carregar os horários"
              retryHint="Carrega os horários novamente"
              onRetry={reload}
            />
          </View>
        ) : (
          <TimePicker slots={slots ?? []} value={time} onChange={setTime} />
        )}
      </View>

      <View
        style={styles.summary}
        accessible
        accessibilityRole="summary"
        accessibilityLiveRegion="polite"
        accessibilityLabel={`Sua seleção: ${summary}. ${checkText}`}
      >
        <View style={styles.summaryIcon}>
          <Icon name="spark" color={colors.accentBright} />
        </View>
        <View style={styles.summaryTexts}>
          <Text style={styles.summarySmall} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            Sua seleção
          </Text>
          <Text style={styles.summaryStrong} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {summary}
          </Text>
          {check ? (
            <Text style={styles.summaryCheck} maxFontSizeMultiplier={MAX_FONT_SCALE}>
              {checkText}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.cta}>
        <AccessibleButton
          title="Ver previsão"
          iconRight="arrow"
          size="lg"
          spread
          disabled={!time}
          hint="Abre a tela de previsão"
          onPress={() => navigation.navigate('Forecast')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: spacing.xxl - 2 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 14 },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: { ...typography.caption, fontWeight: '800', color: colors.onBrand },
  stepTitle: { ...typography.cardTitle, color: colors.text, flex: 1 },
  loading: { ...typography.bodySmall, color: colors.textMuted, marginTop: spacing.lg },
  error: { marginTop: spacing.md },
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTexts: { flex: 1, gap: 3 },
  summarySmall: { ...typography.caption, fontWeight: '400', color: colors.textMuted },
  summaryCheck: { ...typography.bodySmall, color: colors.textMuted },
  summaryStrong: { ...typography.label, color: colors.text },
  cta: { marginTop: 14 },
});
