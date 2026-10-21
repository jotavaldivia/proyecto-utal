import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppContext';
import './GroupCard.css';

export const GroupCard = ({ group }) => {
    const { currentStudent, enrollInGroup } = useContext(AppContext);
    const enrolledGroupIds = currentStudent?.enrolledGroupIds || [];
    const isMember = enrolledGroupIds.includes(group.id);

    const handleEnroll = () => {
        if (window.confirm(`¿Deseas inscribirte en ${group.name || group.nombre}?`)) {
            enrollInGroup(group.id);
        }
    };

    const thematicArea = group.thematicArea || group.tematica || group.areaTematica || 'General';
    const campusDisplay = group.campus || group.campus_id || 'Campus';
    const schedules = group.meetingSchedule || group.horario_reunion || group.horarios || 'Por definir';
    const availableSpots = group.availableSpots ?? group.cupos_disponibles ?? group.cuposDisponibles ?? 0;

    return (
        <div className={`group-card ${isMember ? 'is-member' : ''}`}>
            <div className="group-header">
                <h3>{group.name || group.nombre}</h3>
                <span className="badge-area">{thematicArea}</span>
            </div>
            <p className="group-info">
                <span><FontAwesomeIcon icon={faLocationDot} className="icon-location" /> {campusDisplay}</span>
                <span>|</span>
                <span><FontAwesomeIcon icon={faClock} className="icon-clock" /> {schedules}</span>
            </p>
            <p className="group-req"><strong>Requisitos:</strong> {group.requirements || group.requisitos || 'Sin requisitos'}</p>

            <div className="group-footer">
                <span className="cupos">Cupos: {availableSpots}</span>
                {isMember ? (
                    <button className="btn-member" disabled>Ya eres miembro</button>
                ) : (
                    <button
                        className="btn-enroll"
                        onClick={handleEnroll}
                        disabled={availableSpots === 0}
                    >
                        {availableSpots > 0 ? 'Inscribirse' : 'Sin Cupos'}
                    </button>
                )}
            </div>
        </div>
    );
};