// components/TaskInput.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { COLORS, PRIORITY, PRIORITY_CONFIG } from '../constants/theme';

export default function TaskInput({ onAddTask }) {
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY.MEDIUM);
  const [errorMsg, setErrorMsg] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleAdd = () => {
    const trimmed = inputText.trim();

    // Validasi kosong
    if (!trimmed) {
      setErrorMsg('⚠️ Nama task tidak boleh kosong!');
      triggerShake();
      return;
    }

    // Validasi minimal 3 karakter
    if (trimmed.length < 3) {
      setErrorMsg('⚠️ Task minimal 3 karakter!');
      triggerShake();
      return;
    }

    // Validasi maksimal 100 karakter
    if (trimmed.length > 100) {
      setErrorMsg('⚠️ Task maksimal 100 karakter!');
      triggerShake();
      return;
    }

    setErrorMsg('');
    onAddTask(trimmed, selectedPriority);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>+ Tambah Task Baru</Text>

      {/* Input field dengan shake animation */}
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <TextInput
          style={[styles.input, errorMsg ? styles.inputError : null]}
          placeholder="Tulis nama task kamu..."
          placeholderTextColor={COLORS.textMuted}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            if (errorMsg) setErrorMsg('');
          }}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          maxLength={100}
          multiline={false}
        />
      </Animated.View>

      {/* Error message */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* Karakter counter */}
      <Text style={styles.charCount}>{inputText.length}/100</Text>

      {/* Priority picker */}
      <Text style={styles.priorityLabel}>Prioritas:</Text>
      <View style={styles.priorityRow}>
        {Object.values(PRIORITY).map((p) => {
          const config = PRIORITY_CONFIG[p];
          const isSelected = selectedPriority === p;
          return (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityBtn,
                { borderColor: config.color },
                isSelected && { backgroundColor: config.bg },
              ]}
              onPress={() => setSelectedPriority(p)}
              activeOpacity={0.7}
            >
              <Text style={styles.priorityIcon}>{config.icon}</Text>
              <Text style={[styles.priorityText, { color: isSelected ? config.color : COLORS.textSecondary }]}>
                {config.label}
              </Text>
              {isSelected && <Text style={[styles.priorityCheck, { color: config.color }]}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Submit button */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.8}>
        <Text style={styles.addBtnText}>＋ Tambah Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  charCount: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  priorityBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: COLORS.bgInput,
  },
  priorityIcon: {
    fontSize: 13,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityCheck: {
    fontSize: 12,
    fontWeight: '800',
  },
  addBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addBtnText: {
    color: COLORS.bg,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
