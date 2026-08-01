import React, { useRef, useEffect, useState } from 'react';
import { ACTIVITY_TYPES, DIFFICULTY_LEVELS, PRIORITIES, STATUSES, DEFAULT_TOPICS } from '../../utils/constants';

export default function ActivityForm({ isOpen, onClose, onSave, activity, topics = [] }) {
  const dialogRef = useRef(null);
  
  const getDefaultFormData = () => ({
    studyDate: new Date().toISOString().split('T')[0],
    topic: '',
    subTopic: '',
    hours: 1,
    difficulty: 'MEDIUM',
    activityType: 'STUDY',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    remarks: ''
  });

  const [formData, setFormData] = useState(getDefaultFormData());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (activity) {
        setFormData({
          studyDate: activity.studyDate || new Date().toISOString().split('T')[0],
          topic: activity.topic || '',
          subTopic: activity.subTopic || '',
          hours: activity.hours || 1,
          difficulty: activity.difficulty || 'MEDIUM',
          activityType: activity.activityType || 'STUDY',
          status: activity.status || 'IN_PROGRESS',
          priority: activity.priority || 'MEDIUM',
          remarks: activity.remarks || ''
        });
      } else {
        setFormData(getDefaultFormData());
      }
      setErrors({});
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studyDate) newErrors.studyDate = 'Please select a date.';
    if (!formData.topic || formData.topic.trim() === '') newErrors.topic = 'Please enter Topic.';
    if (!formData.subTopic || formData.subTopic.trim() === '') newErrors.subTopic = 'Please enter Subtopic.';
    
    const hours = parseFloat(formData.hours);
    if (isNaN(hours) || hours <= 0) newErrors.hours = 'Hours must be greater than zero.';
    if (hours > 24) newErrors.hours = 'Hours cannot exceed 24.';
    
    if (!formData.status) newErrors.status = 'Please select Status.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        hours: parseFloat(formData.hours)
      });
    }
  };

  const combinedTopics = Array.from(new Set([...DEFAULT_TOPICS, ...topics]));

  return (
    <dialog ref={dialogRef} className="custom-dialog form-dialog" onClose={onClose}>
      <div className="dialog-content">
        <h2>{activity ? 'Edit Activity' : 'Add New Activity'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Study Date *</label>
              <input type="date" name="studyDate" value={formData.studyDate} onChange={handleChange} />
              {errors.studyDate && <div className="error-message">{errors.studyDate}</div>}
            </div>

            <div className="form-group">
              <label>Topic *</label>
              <input 
                type="text" 
                name="topic" 
                list="topic-list" 
                value={formData.topic} 
                onChange={handleChange} 
                placeholder="e.g. Java, System Design"
              />
              <datalist id="topic-list">
                {combinedTopics.map(t => <option key={t} value={t} />)}
              </datalist>
              {errors.topic && <div className="error-message">{errors.topic}</div>}
            </div>

            <div className="form-group">
              <label>Subtopic *</label>
              <input 
                type="text" 
                name="subTopic" 
                value={formData.subTopic} 
                onChange={handleChange} 
                placeholder="e.g. Multithreading"
              />
              {errors.subTopic && <div className="error-message">{errors.subTopic}</div>}
            </div>

            <div className="form-group">
              <label>Hours *</label>
              <input 
                type="number" 
                name="hours" 
                step="0.25" 
                min="0.25" 
                max="24" 
                value={formData.hours} 
                onChange={handleChange} 
              />
              {errors.hours && <div className="error-message">{errors.hours}</div>}
            </div>

            <div className="form-group">
              <label>Activity Type</label>
              <select name="activityType" value={formData.activityType} onChange={handleChange}>
                {ACTIVITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.status && <div className="error-message">{errors.status}</div>}
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                {DIFFICULTY_LEVELS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            
            <div className="form-group full-width">
              <label>Remarks</label>
              <textarea 
                name="remarks" 
                maxLength={500} 
                value={formData.remarks || ''} 
                onChange={handleChange}
                placeholder="Add any notes or observations..."
                rows="3"
              ></textarea>
              <div className="char-counter">{formData.remarks?.length || 0}/500</div>
            </div>
          </div>
          
          <div className="dialog-actions">
            <button type="button" className="btn-secondary" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
