import React from 'react';
import SummaryCard from './SummaryCard';
import ProgressBar from '../common/ProgressBar';

export default function DashboardCards({ dashboard }) {
  if (!dashboard) return null;

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <SummaryCard 
          icon="⏱️" 
          label="Total Study Hours" 
          value={dashboard.totalStudyHours != null ? Number(dashboard.totalStudyHours).toFixed(1) : '0'} 
          variant="teal" 
        />
        <SummaryCard 
          icon="✅" 
          label="Completed Activities" 
          value={dashboard.completedActivities || '0'} 
          variant="purple" 
        />
        <SummaryCard 
          icon="⏳" 
          label="Pending Activities" 
          value={dashboard.pendingActivities || '0'} 
          variant="amber" 
        />
        <SummaryCard 
          icon="📈" 
          label="Completion Rate" 
          value={`${(dashboard.completionPercentage || 0).toFixed(1)}%`} 
          variant="rose"
        >
          <ProgressBar percentage={dashboard.completionPercentage || 0} />
        </SummaryCard>
      </div>

      <div className="topic-insights">
        <div className="insight-card most-studied">
          <div className="insight-icon">🏆</div>
          <div className="insight-details">
            <span className="insight-label">Most Studied Topic</span>
            <span className="insight-value">{dashboard.mostStudiedTopic || 'N/A'}</span>
          </div>
        </div>
        <div className="insight-card least-studied">
          <div className="insight-icon">📉</div>
          <div className="insight-details">
            <span className="insight-label">Least Studied Topic</span>
            <span className="insight-value">{dashboard.leastStudiedTopic || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
