import React from 'react';
import StatusBadge from './StatusBadge';
import { getActivityTypeLabel, getDifficultyLabel, getPriorityLabel } from '../../utils/constants';

export default function ActivityTable({ activities, onEdit, onDelete, onStatusChange, loading }) {
  if (loading) {
    return <div className="empty-state">Loading activities...</div>;
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <p>No activities found. Add one to get started!</p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="table-container">
      <table className="activity-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Topic</th>
            <th>Subtopic</th>
            <th>Hours</th>
            <th>Type</th>
            <th>Status</th>
            <th>Difficulty</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{formatDate(activity.studyDate)}</td>
              <td className="fw-500">{activity.topic}</td>
              <td className="text-muted">{activity.subTopic}</td>
              <td>{activity.hours}h</td>
              <td>{getActivityTypeLabel(activity.activityType)}</td>
              <td>
                <StatusBadge 
                  status={activity.status} 
                  onChange={(newStatus) => onStatusChange && onStatusChange(activity, newStatus)}
                />
              </td>
              <td>{getDifficultyLabel(activity.difficulty)}</td>
              <td>
                <span className={`priority-indicator priority-${activity.priority?.toLowerCase() || 'medium'}`}>
                  {getPriorityLabel(activity.priority)}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="btn-icon" onClick={() => onEdit(activity)} title="Edit">✏️</button>
                  <button className="btn-icon danger" onClick={() => onDelete(activity)} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
