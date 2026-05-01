// components/EmptyState.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const MESSAGES = {
  Semua: {
    emoji: '📋',
    title: 'Belum ada task!',
    desc: 'Yuk tambahkan task pertamamu\ndan mulai produktif hari ini!',
  },
  Aktif: {
    emoji: '🎉',
    title: 'Semua task selesai!',
    desc: 'Kamu sudah menyelesaikan\nsemua task aktif. Hebat!',
  },
  Selesai: {
    emoji: '⏳',
    title: 'Belum ada task selesai',
    desc: 'Mulai kerjakan task-mu\ndan tandai sebagai selesai!',
  },
};

export default function EmptyState({ filter }) {
  const msg = MESSAGES[filter] || MESSAGES['Semua'];
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{msg.emoji}</Text>
      <Text style={styles.title}>{msg.title}</Text>
      <Text style={styles.desc}>{msg.desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
