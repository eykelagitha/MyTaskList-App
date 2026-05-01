// App.js
// MyTaskList App — Mini Project P07
// Nama  : Eykel Agitha Kembaren
// NIM   : [NIM Anda]
// Prodi : Sistem Informasi

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import { COLORS, FILTER } from './constants/theme';

// ─────────────────────────────────────────────
// Helper: format waktu singkat
// ─────────────────────────────────────────────
function formatTime(date) {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month} ${h}:${m}`;
}

// ─────────────────────────────────────────────
// Komponen utama
// ─────────────────────────────────────────────
export default function App() {
  // STATE 1 — array data task
  const [tasks, setTasks] = useState([]);

  // STATE 2 — filter aktif (Semua / Aktif / Selesai)
  const [activeFilter, setActiveFilter] = useState(FILTER.ALL);

  // ── Computed values ──────────────────────────
  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);
  const totalCount = tasks.length;

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case FILTER.ACTIVE:
        return tasks.filter((t) => !t.done);
      case FILTER.DONE:
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const filterCounts = useMemo(() => ({
    [FILTER.ALL]: tasks.length,
    [FILTER.ACTIVE]: tasks.filter((t) => !t.done).length,
    [FILTER.DONE]: tasks.filter((t) => t.done).length,
  }), [tasks]);

  // ── Handler: Add task ────────────────────────
  const handleAddTask = useCallback((text, priority) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      done: false,
      createdAt: formatTime(new Date()),
    };
    setTasks((prev) => [newTask, ...prev]);
    // Kalau filter aktif = Selesai, auto switch ke Semua supaya task baru kelihatan
    if (activeFilter === FILTER.DONE) setActiveFilter(FILTER.ALL);
  }, [activeFilter]);

  // ── Handler: Toggle done ─────────────────────
  const handleToggleDone = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  // ── Handler: Delete task ─────────────────────
  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Handler: Clear semua task selesai ────────
  const handleClearDone = () => {
    if (doneCount === 0) return;
    Alert.alert(
      '🧹 Bersihkan Task Selesai',
      `Hapus semua ${doneCount} task yang sudah selesai?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Semua',
          style: 'destructive',
          onPress: () => setTasks((prev) => prev.filter((t) => !t.done)),
        },
      ]
    );
  };

  // ── Render item FlatList ─────────────────────
  const renderTask = useCallback(
    ({ item }) => (
      <TaskItem
        task={item}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />
    ),
    [handleToggleDone, handleDelete]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  // ── Render ───────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgHeader} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          // ─── List header: semua UI di atas list ───
          ListHeaderComponent={
            <>
              <Header totalTask={totalCount} doneTask={doneCount} />
              <TaskInput onAddTask={handleAddTask} />
              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={filterCounts}
              />
              {/* Tombol clear selesai — conditional rendering */}
              {doneCount > 0 && (
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={handleClearDone}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearBtnText}>
                    🧹 Hapus {doneCount} task selesai
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>
                  {activeFilter === FILTER.ALL
                    ? 'Semua Task'
                    : activeFilter === FILTER.ACTIVE
                    ? 'Task Aktif'
                    : 'Task Selesai'}
                </Text>
                <Text style={styles.listCount}>{filteredTasks.length} task</Text>
              </View>
            </>
          }
          // ─── Empty state ───────────────────────────
          ListEmptyComponent={<EmptyState filter={activeFilter} />}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  clearBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: 'rgba(255,92,92,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,92,92,0.25)',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  clearBtnText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  listCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.bgCard,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontWeight: '600',
  },
});
