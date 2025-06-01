import { Entry } from "lib/types";

// Export the interface for use in tests
export interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: EntryListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).replace(',', ' at');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete(id);
    }
  };

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <h3>No entries yet</h3>
        <p>Start writing your first journal entry!</p>
      </div>
    );
  }

  return (
    <div className="entries-grid">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card" style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          marginBottom: '1rem', 
          background: '#fff', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          <h3 className="entry-title" style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600',
            color: '#1f2937', 
            marginBottom: '0.75rem',
            marginTop: '0'
          }}>{entry.title}</h3>
          <p className="entry-date" style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            marginBottom: '1rem',
            fontWeight: '400'
          }}>{formatDate(entry.createdAt)}</p>
          <p className="entry-content" style={{ 
            fontSize: '1rem', 
            color: '#374151', 
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>{entry.content}</p>
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
            onClick={() => handleDelete(entry.id)}
            className="delete-button"
            style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px', 
              background: '#fff', 
              color: '#6b7280', 
              cursor: 'pointer', 
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
            aria-label="Delete entry"
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#f9fafb';
              target.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#fff';
              target.style.borderColor = '#d1d5db';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
            Delete
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}