// components/TaskItem.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { COLORS, PRIORITY_CONFIG } from '../constants/theme';

export default function TaskItem({ task, onToggleDone, onDelete }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Animasi masuk saat item baru ditambahkan
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Hapus Task',
      `Yakin mau hapus task "${task.text}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            // Animasi keluar sebelum hapus
            Animated.parallel([
              Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
              Animated.timing(slideAnim, { toValue: -20, duration: 200, useNativeDriver: true }),
            ]).start(() => onDelete(task.id));
          },
        },
      ]
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        task.done && styles.containerDone,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Priority bar kiri */}
      <View style={[styles.priorityBar, { backgroundColor: priorityConfig.color }]} />

      <View style={styles.content}>
        {/* Row atas: checkbox + teks task */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={[styles.checkbox, task.done && styles.checkboxDone]}
            onPress={() => onToggleDone(task.id)}
            activeOpacity={0.7}
          >
            {task.done && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <View style={styles.textWrap}>
            <Text
              style={[styles.taskText, task.done && styles.taskTextDone]}
              numberOfLines={2}
            >
              {task.text}
            </Text>

            {/* Row bawah: badge prioritas + waktu */}
            <View style={styles.metaRow}>
              <View style={[styles.priorityBadge, { backgroundColor: priorityConfig.bg }]}>
                <Text style={styles.priorityIcon}>{priorityConfig.icon}</Text>
                <Text style={[styles.priorityLabel, { color: priorityConfig.color }]}>
                  {priorityConfig.label}
                </Text>
              </View>
              <Text style={styles.timeText}>{task.createdAt}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Done badge */}
      {task.done && (
        <View style={styles.doneBadge}>
          <Text style={styles.doneBadgeText}>SELESAI ✓</Text>
        </View>
      )}

      {/* Tombol hapus */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.7}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
  },
  containerDone: {
    backgroundColor: COLORS.doneBg,
    borderColor: COLORS.border,
    opacity: 0.75,
  },
  priorityBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  checkmark: {
    color: COLORS.bg,
    fontSize: 13,
    fontWeight: '900',
  },
  textWrap: {
    flex: 1,
    gap: 6,
  },
  taskText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
    lineHeight: 20,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textDone,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityIcon: {
    fontSize: 10,
  },
  priorityLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  doneBadge: {
    backgroundColor: COLORS.accentDim,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  doneBadgeText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'rgba(255,92,92,0.1)',
    borderRadius: 8,
  },
  deleteIcon: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '700',
  },
});
