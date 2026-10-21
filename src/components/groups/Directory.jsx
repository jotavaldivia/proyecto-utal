import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { GroupCard } from './GroupCard';
import './Directory.css';

export const Directory = () => {
    const { intermediateGroups, currentStudent } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showMyGroups, setShowMyGroups] = useState(false);

    const filteredGroups = (intermediateGroups || []).filter(group => {
        const search = searchTerm.toLowerCase();
        const name = (group.name || group.nombre || '').toLowerCase();
        const topic = (group.thematicArea || group.tematica || '').toLowerCase();
        const matchesSearch = name.includes(search) || topic.includes(search);
        
        const enrolledGroupIds = currentStudent?.enrolledGroupIds || [];
        const isMember = enrolledGroupIds.includes(group.id);
        const matchesMembership = showMyGroups ? isMember : true;

        return matchesSearch && matchesMembership;
    });

    return (
        <div className="directory-container">
            <div className="directory-filters">
                <input
                    type="text"
                    placeholder="Buscar por grupo o área temática..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button
                    className={`filter-btn ${showMyGroups ? 'active' : ''}`}
                    onClick={() => setShowMyGroups(!showMyGroups)}
                >
                    {showMyGroups ? 'Ver Todos' : 'Mis Grupos'}
                </button>
            </div>

            <div className="groups-grid">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                        <GroupCard key={group.id} group={group} />
                    ))
                ) : (
                    <div className="empty-state">No se encontraron grupos.</div>
                )}
            </div>
        </div>
    );
};