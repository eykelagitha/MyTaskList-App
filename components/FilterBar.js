// components/FilterBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FILTER } from '../constants/theme';

export default function FilterBar({ activeFilter, onFilterChange, counts }) {
  return (
    <View style={styles.container}>
      {Object.values(FILTER).map((f) => {
        const isActive = activeFilter === f;
        return (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, isActive && styles.filterBtnActive]}
            onPress={() => onFilterChange(f)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
              {f}
            </Text>
            <View style={[styles.badge, isActive && styles.badgeActive]}>
              <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                {counts[f]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 9,
  },
  filterBtnActive: {
    backgroundColor: COLORS.accentSoft,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.accent,
  },
  badge: {
    backgroundColor: COLORS.bgInput,
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: COLORS.accentDim,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  badgeTextActive: {
    color: COLORS.accent,
  },
});
