import React from 'react';
import { Search, LayoutGrid, Table, RotateCcw, Filter } from 'lucide-react';
import { ROLES, STATUSES, DEPARTMENTS } from '../data/mockUsers';

export const UserControls = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  deptFilter,
  setDeptFilter,
  viewMode,
  setViewMode,
  resetFilters
}) => {
  const isFiltered = searchQuery || roleFilter !== 'ALL' || statusFilter !== 'ALL' || deptFilter !== 'ALL';

  return (
    <div className="controls-card">
      {/* Search Bar */}
      <div className="search-box">
        <Search size={16} />
        <input 
          type="text"
          className="search-input"
          placeholder="Filter by user name, email, department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="filter-group">
        <select 
          className="select-control"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          {ROLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select 
          className="select-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select 
          className="select-control"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="ALL">All Departments</option>
          {DEPARTMENTS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {isFiltered && (
          <button className="btn btn-secondary" onClick={resetFilters} title="Clear all filters">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}

        {/* View Mode Switcher */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <Table size={16} />
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Card Grid View"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
