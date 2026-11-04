import { AccessibilityInfo } from 'react-native';

/** Anuncia uma mensagem para TalkBack/VoiceOver. */
export const announce = (message: string) =>
  AccessibilityInfo.announceForAccessibility(message);
