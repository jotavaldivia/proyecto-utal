import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './ReviewModal.css';

export const ReviewModal = ({ venture, onClose }) => {
    const { addReview } = useContext(AppContext);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') return alert('Por favor, escribe un comentario.');

        addReview(venture.id, { rating: Number(rating), puntuacion: Number(rating), comment, comentario: comment });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Calificar {venture.nombre}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Puntuación (1-5):</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            {[5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>{num} Estrellas</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comentario:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Escribe tu recomendación..."
                            rows="4"
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-submit">Publicar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};