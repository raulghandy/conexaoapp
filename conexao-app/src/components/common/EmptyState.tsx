import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors, typography, spacing, radius } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';

interface Props {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = 'Tudo visto por enquanto',
  message = 'Novas previsões aparecerão aqui quando estiverem disponíveis.',
}: Props) {
  return (
    <View style={styles.card} accessible accessibilityRole="summary" accessibilityLabel={`${title}. ${message}`}>
      {/* Ilustração decorativa (o texto já transmite a mensagem) */}
      <Svg
        width={150}
        height={82}
        viewBox="0 0 160 90"
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      >
        <Path d="M31 75c15-8 83-9 101 0-12 9-86 10-101 0Z" fill={colors.surfaceSoft} />
        <Rect x={43} y={16} width={74} height={60} rx={14} fill={colors.surface} stroke={colors.brandBright} strokeWidth={2} />
        <Path d="M43 32h74" stroke={colors.accent} strokeWidth={4} />
        <Path
          d="M59 10v13m42-13v13M62 49a25 25 0 0 1 36 0M69 57a15 15 0 0 1 22 0"
          fill="none"
          stroke={colors.brandBright}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Circle cx={80} cy={66} r={4} fill={colors.brandBright} />
      </Svg>
      <Text style={styles.title} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {title}
      </Text>
      <Text style={styles.message} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 165,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 19,
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: { ...typography.label, color: colors.text, textAlign: 'center' },
  message: { ...typography.bodySmall, color: colors.textMuted, textAlign: 'center', maxWidth: 260 },
});
