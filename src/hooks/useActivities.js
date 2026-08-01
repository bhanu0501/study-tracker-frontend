import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/activityApi';

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalStudyHours: 0,
    completedActivities: 0,
    pendingActivities: 0,
    totalActivities: 0,
    completionPercentage: 0,
    mostStudiedTopic: null,
    leastStudiedTopic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Default to today YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const targetDate = selectedDate || new Date().toISOString().split('T')[0];
      const [acts, dash] = await Promise.all([
        api.fetchActivities(),
        api.fetchDashboardByDate(targetDate)
      ]);
      setActivities(acts || []);
      setDashboard(dash || {
        totalStudyHours: 0,
        completedActivities: 0,
        pendingActivities: 0,
        totalActivities: 0,
        completionPercentage: 0,
        mostStudiedTopic: null,
        leastStudiedTopic: null,
      });
    } catch (err) {
      console.error('Failed to load data:', err);
      setError(err.message || 'Failed to load data');
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addActivity = async (data) => {
    await api.createActivity(data);
    await loadData();
  };

  const editActivity = async (id, data) => {
    await api.updateActivity(id, data);
    await loadData();
  };

  const removeActivity = async (id) => {
    await api.deleteActivity(id);
    await loadData();
  };

  const refreshAll = () => {
    loadData();
  };

  return {
    activities,
    dashboard,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    addActivity,
    editActivity,
    removeActivity,
    refreshAll,
  };
}
