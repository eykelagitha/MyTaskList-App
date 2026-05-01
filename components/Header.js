// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Header({ totalTask, doneTask }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.emoji}>✅</Text>
        <View>
          <Text style={styles.title}>MyTaskList</Text>
          <Text style={styles.subtitle}>Kelola tugasmu, capai tujuanmu.</Text>
        </View>
      </View>

      {/* Counter banner bonus */}
      <View style={styles.counterBadge}>
        <Text style={styles.counterText}>
          <Text style={styles.counterHighlight}>{doneTask}</Text>
          <Text style={styles.counterMuted}> dari </Text>
          <Text style={styles.counterHighlight}>{totalTask}</Text>
          <Text style={styles.counterMuted}> task selesai</Text>
        </Text>
        {totalTask > 0 && (
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round((doneTask / totalTask) * 100)}%` },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgHeader,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  counterBadge: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.accentDim,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  counterText: {
    fontSize: 13,
    marginBottom: 6,
  },
  counterHighlight: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  counterMuted: {
    color: COLORS.textSecondary,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.accentDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
});
