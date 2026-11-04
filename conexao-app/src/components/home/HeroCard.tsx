import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, tones, typography, spacing, radius, MIN_TOUCH_SIZE } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { ConnectionLevel } from '../../types/connection';
import { LEVELS } from '../../utils/levels';
import { Icon } from '../common/Icon';

interface Props {
  level: ConnectionLevel;
  headline: string;
  description: string;
  onExplore: () => void;
}

export function HeroCard({ level, headline, description, onExplore }: Props) {
  const config = LEVELS[level];
  const tone = tones[config.tone];
  const statusText = `Status: ${config.label.toLowerCase()}`;

  return (
    <View style={[styles.card, { backgroundColor: tone.hero }]}>
      {/* detalhe decorativo */}
      <View
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
        style={styles.circle}
      />

      <View style={styles.top}>
        <View style={styles.badge} accessible accessibilityLabel={statusText}>
          <Icon name={config.icon} size={18} color={tone.fg} />
          <Text style={[styles.badgeText, { color: tone.fg }]} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {statusText}
          </Text>
        </View>
        <Icon name="wifi" size={30} color={colors.onBrand} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.kicker} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          Condição atual
        </Text>
        <Text style={styles.headline} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {headline}
        </Text>
        <Text style={styles.description} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {description}
        </Text>
      </View>

      <Pressable
        onPress={onExplore}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Ver análise completa"
        accessibilityHint="Abre a tela de detalhes da conexão"
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
      >
        <Text style={styles.linkText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          Ver análise completa
        </Text>
        <Icon name="arrow" size={18} color={colors.onBrand} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 268,
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: 180,
    height: 180,
    right: -80,
    bottom: -94,
    borderRadius: 90,
    borderWidth: 32,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  badgeText: { ...typography.caption, fontWeight: '800' },
  copy: { marginTop: 33, marginBottom: spacing.xl },
  kicker: { ...typography.caption, color: colors.heroMuted, marginBottom: 5 },
  headline: { ...typography.title, color: colors.onBrand, marginBottom: 10, maxWidth: 290 },
  description: { ...typography.bodySmall, color: colors.heroMuted, maxWidth: 310 },
  link: {
    minHeight: MIN_TOUCH_SIZE,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: { ...typography.label, color: colors.onBrand, fontWeight: '800' },
  pressed: { opacity: 0.8 },
});
