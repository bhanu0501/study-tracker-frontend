import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import DashboardCards from './components/Dashboard/DashboardCards';
import ActivityFilters from './components/Activity/ActivityFilters';
import ActivityTable from './components/Activity/ActivityTable';
import FloatingButton from './components/common/FloatingButton';
import ActivityForm from './components/Activity/ActivityForm';
import DeleteConfirmDialog from './components/Activity/DeleteConfirmDialog';
import SettingsPage from './components/Settings/SettingsPage';
import { useActivities } from './hooks/useActivities';
import { useSettings } from './hooks/useSettings';
import { fetchTopics } from './api/activityApi';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const {
    activities,
    dashboard,
    loading,
    error,
    setSelectedDate,
    addActivity,
    editActivity,
    removeActivity,
  } = useActivities();

  const {
    settings,
    changeTheme,
    changeAccentColor,
    changeFontSize,
  } = useSettings();

  const [topics, setTopics] = useState([]);
  
  // UI states
  const [formOpen, setFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    date: '',
    topic: '',
    status: '',
    type: '',
    search: ''
  });

  useEffect(() => {
    fetchTopics().then(data => {
      if (data) setTopics(data);
    }).catch(() => {});
  }, [activities]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'date' && setSelectedDate) {
      setSelectedDate(value || new Date().toISOString().split('T')[0]);
    }
  };

  const clearFilters = () => {
    setFilters({ date: '', topic: '', status: '', type: '', search: '' });
    if (setSelectedDate) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleSaveActivity = async (data) => {
    setSaving(true);
    try {
      if (editingActivity) {
        await editActivity(editingActivity.id, data);
      } else {
        await addActivity(data);
      }
      setFormOpen(false);
      setEditingActivity(null);
    } catch (err) {
      console.error('Failed to save activity:', err);
      alert(err?.message || 'Failed to save activity. Please check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleQuickStatusChange = async (activity, newStatus) => {
    if (activity.status === newStatus) return;
    try {
      await editActivity(activity.id, {
        ...activity,
        status: newStatus
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err?.message || 'Failed to update activity status.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (activityToDelete) {
        await removeActivity(activityToDelete.id);
        setDeleteDialogOpen(false);
        setActivityToDelete(null);
      }
    } catch (err) {
      console.error('Failed to delete activity:', err);
      alert(err?.message || 'Failed to delete activity.');
    }
  };

  const openAddForm = () => {
    setEditingActivity(null);
    setFormOpen(true);
  };

  const openEditForm = (activity) => {
    setEditingActivity(activity);
    setFormOpen(true);
  };

  const openDeleteDialog = (activity) => {
    setActivityToDelete(activity);
    setDeleteDialogOpen(true);
  };

  const handleCloseForm = () => {
    if (!saving) {
      setFormOpen(false);
      setEditingActivity(null);
    }
  };

  // Client side filtering
  const filteredActivities = activities.filter(a => {
    if (filters.date && a.studyDate !== filters.date) return false;
    if (filters.topic && a.topic?.toLowerCase() !== filters.topic.toLowerCase()) return false;
    if (filters.status && a.status !== filters.status) return false;
    if (filters.type && a.activityType !== filters.type) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        a.topic?.toLowerCase().includes(q) ||
        a.subTopic?.toLowerCase().includes(q) ||
        a.remarks?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      
      {currentPage === 'dashboard' && (
        <div className="dashboard-page">
          <DashboardCards dashboard={dashboard} />
        </div>
      )}

      {currentPage === 'activities' && (
        <div className="activities-page">
          <div className="section-header">
            <h2>Activity Tracker</h2>
          </div>
          
          <ActivityFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onClearFilters={clearFilters}
            topics={topics}
          />
          
          <ActivityTable 
            activities={filteredActivities} 
            loading={loading}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
            onStatusChange={handleQuickStatusChange}
          />
          
          <FloatingButton onClick={openAddForm} />
        </div>
      )}

      {currentPage === 'settings' && (
        <SettingsPage
          settings={settings}
          onThemeChange={changeTheme}
          onAccentChange={changeAccentColor}
          onFontSizeChange={changeFontSize}
        />
      )}

      <ActivityForm 
        isOpen={formOpen} 
        onClose={handleCloseForm} 
        onSave={handleSaveActivity} 
        activity={editingActivity}
        topics={topics}
      />
      
      <DeleteConfirmDialog 
        isOpen={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setActivityToDelete(null);
        }}
      />
      
    </Layout>
  );
}

export default App;
