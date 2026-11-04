import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing, radius, MIN_TOUCH_SIZE } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { Icon } from './Icon';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Texto exibido pelo botão de informações. */
  info?: string;
}

export function ScreenHeader({ eyebrow, title, subtitle, info }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <Text style={styles.eyebrow} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {eyebrow}
        </Text>
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {info ? (
        <Pressable
          onPress={() => Alert.alert(title, info)}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Informações sobre esta tela"
          accessibilityHint="Abre uma explicação rápida"
          style={({ pressed }) => [styles.infoButton, pressed && styles.pressed]}
        >
          <Icon name="info" color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  texts: { flex: 1 },
  eyebrow: { ...typography.eyebrow, color: colors.brandBright },
  title: { ...typography.display, color: colors.text, marginTop: 3 },
  subtitle: { ...typography.bodySmall, color: colors.textMuted, marginTop: spacing.sm },
  infoButton: {
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
});
