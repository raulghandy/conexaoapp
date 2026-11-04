import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing, radius } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { announce } from '../../utils/a11y';
import { AccessibleButton } from './AccessibleButton';
import { Icon } from './Icon';

interface Props {
  onRetry: () => void;
  title?: string;
  description?: string;
  retryHint?: string;
}

export function ErrorCard({
  onRetry,
  title = 'Não foi possível atualizar',
  description = 'Verifique sua conexão e tente novamente.',
  retryHint = 'Tenta carregar de novo',
}: Props) {
  // Anuncia o erro assim que ele aparece (funciona em TalkBack e VoiceOver).
  useEffect(() => {
    announce(`${title}. ${description}`);
  }, [title, description]);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Icon name="wifi" color={colors.danger} />
        </View>
        <View
          style={styles.texts}
          accessible
          accessibilityRole="alert"
          accessibilityLabel={`${title}. ${description}`}
        >
          <Text style={styles.title} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {title}
          </Text>
          <Text style={styles.description} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.action}>
        <AccessibleButton
          variant="outline"
          icon="refresh"
          title="Tentar novamente"
          hint={retryHint}
          onPress={onRetry}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.dangerLine,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 19,
    gap: spacing.md,
  },
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1 },
  title: { ...typography.label, color: colors.text },
  description: { ...typography.bodySmall, color: colors.textMuted, marginTop: 5 },
  action: { alignSelf: 'flex-start', marginLeft: 56 },
});
