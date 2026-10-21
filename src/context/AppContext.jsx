import { createContext, useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

const STORAGE_KEY = 'student_platform_data';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    currentStudent: null,
    ventures: [],
    intermediateGroups: [],
    campuses: [],
    estudianteActual: null,
    emprendimientos: [],
    gruposIntermedios: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const normalizeVenture = (v) => ({
          ...v,
          name: v.name || v.nombre,
          description: v.description || v.descripcion,
          category: v.category || v.clasificacion || v.categoria || 'General',
          averageRating: v.averageRating ?? v.promedio_valoracion ?? v.promedioEstrellas ?? 0,
          totalReviews: v.totalReviews ?? v.total_valoraciones ?? v.totalResenas ?? 0,
          reviews: v.reviews || v.valoraciones || v.resenas || [],
          contact: v.contact || v.redes_y_contacto || v.contacto || {}
        });

        const normalizeGroup = (g) => {
          const spots = g.availableSpots ?? g.cupos_disponibles ?? g.cuposDisponibles ?? 0;
          return {
            ...g,
            name: g.name || g.nombre,
            thematicArea: g.thematicArea || g.tematica || g.areaTematica || 'General',
            meetingSchedule: g.meetingSchedule || g.horario_reunion || g.horarios || 'Por definir',
            availableSpots: spots,
            cupos_disponibles: spots,
            cuposDisponibles: spots,
            requirements: g.requirements || g.requisitos || 'Sin requisitos'
          };
        };

        const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('plataforma_estudiantil_data');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const activeStudent = parsed.currentStudent || parsed.estudianteActual;
            if (parsed && activeStudent) {
              const rawVentures = parsed.ventures || parsed.emprendimientos || [];
              const rawGroups = parsed.intermediateGroups || parsed.gruposIntermedios || parsed.grupos_intermedios || [];
              const student = {
                ...activeStudent,
                name: activeStudent.name || activeStudent.nombre,
                career: activeStudent.career || activeStudent.carrera,
                email: activeStudent.email || activeStudent.correo,
                favoriteVentureIds: activeStudent.favoriteVentureIds || activeStudent.favoritosEmprendimientosIds || activeStudent.favoritosIds || [],
                likedVentureIds: activeStudent.likedVentureIds || activeStudent.likesEmprendimientosIds || [],
                enrolledGroupIds: activeStudent.enrolledGroupIds || activeStudent.gruposInscritosIds || [],
                favoritosIds: activeStudent.favoriteVentureIds || activeStudent.favoritosEmprendimientosIds || activeStudent.favoritosIds || [],
                favoritosEmprendimientosIds: activeStudent.favoriteVentureIds || activeStudent.favoritosEmprendimientosIds || activeStudent.favoritosIds || [],
                likesEmprendimientosIds: activeStudent.likedVentureIds || activeStudent.likesEmprendimientosIds || [],
                gruposInscritosIds: activeStudent.enrolledGroupIds || activeStudent.gruposInscritosIds || []
              };
              const normalizedVentures = rawVentures.map(normalizeVenture);
              const normalizedGroups = rawGroups.map(normalizeGroup);
              const normalizedData = {
                ...parsed,
                currentStudent: student,
                ventures: normalizedVentures,
                intermediateGroups: normalizedGroups,
                campuses: parsed.campuses || parsed.campus || [],
                estudianteActual: student,
                emprendimientos: normalizedVentures,
                gruposIntermedios: normalizedGroups,
                campus: parsed.campuses || parsed.campus || []
              };
              setData(normalizedData);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Error al parsear localStorage:', e);
          }
        }

        const result = await fetchData();
        const studentData = result.currentStudent || result.estudianteActual;
        const student = studentData ? {
          ...studentData,
          name: studentData.name || studentData.nombre,
          career: studentData.career || studentData.carrera,
          email: studentData.email || studentData.correo,
          favoriteVentureIds: studentData.favoriteVentureIds || studentData.favoritosEmprendimientosIds || studentData.favoritosIds || [],
          likedVentureIds: studentData.likedVentureIds || studentData.likesEmprendimientosIds || [],
          enrolledGroupIds: studentData.enrolledGroupIds || studentData.gruposInscritosIds || [],
          favoritosIds: studentData.favoriteVentureIds || studentData.favoritosEmprendimientosIds || studentData.favoritosIds || [],
          favoritosEmprendimientosIds: studentData.favoriteVentureIds || studentData.favoritosEmprendimientosIds || studentData.favoritosIds || [],
          likesEmprendimientosIds: studentData.likedVentureIds || studentData.likesEmprendimientosIds || [],
          gruposInscritosIds: studentData.enrolledGroupIds || studentData.gruposInscritosIds || []
        } : null;

        const normalizedVentures = (result.emprendimientos || result.ventures || []).map(normalizeVenture);
        const normalizedGroups = (result.grupos_intermedios || result.gruposIntermedios || result.intermediateGroups || []).map(normalizeGroup);

        const initialData = {
          currentStudent: student,
          ventures: normalizedVentures,
          intermediateGroups: normalizedGroups,
          campuses: result.campus || result.campuses || [],
          estudianteActual: student,
          emprendimientos: normalizedVentures,
          gruposIntermedios: normalizedGroups,
          campus: result.campus || result.campuses || []
        };

        setData(initialData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!loading && (data.currentStudent || data.estudianteActual)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, loading]);

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('plataforma_estudiantil_data');
    window.location.reload();
  };

  const toggleFavorite = (ventureId) => {
    setData(prev => {
      const activeStudent = prev.currentStudent || prev.estudianteActual;
      if (!activeStudent) return prev;
      const currentFavs = activeStudent.favoriteVentureIds || activeStudent.favoritosIds || activeStudent.favoritosEmprendimientosIds || [];
      const isFav = currentFavs.includes(ventureId);
      const newFavorites = isFav 
        ? currentFavs.filter(id => id !== ventureId)
        : [...currentFavs, ventureId];
        
      const updatedStudent = {
        ...activeStudent,
        favoriteVentureIds: newFavorites,
        favoritosIds: newFavorites,
        favoritosEmprendimientosIds: newFavorites
      };

      return {
        ...prev,
        currentStudent: updatedStudent,
        estudianteActual: updatedStudent
      };
    });
  };

  const toggleLike = (ventureId, isLiking) => {
    setData(prev => {
      const ventureList = prev.ventures || prev.emprendimientos || [];
      const updatedVentures = ventureList.map(venture => {
        if (venture.id === ventureId) {
          const currentLikes = venture.likes ?? 0;
          return { ...venture, likes: isLiking ? currentLikes + 1 : Math.max(0, currentLikes - 1) };
        }
        return venture;
      });
      return {
        ...prev,
        ventures: updatedVentures,
        emprendimientos: updatedVentures
      };
    });
  };

  const addReview = (ventureId, review) => {
    setData(prev => {
      const ventureList = prev.ventures || prev.emprendimientos || [];
      const updatedVentures = ventureList.map(venture => {
        if (venture.id === ventureId) {
          const currentReviews = venture.reviews || venture.valoraciones || venture.resenas || [];
          const updatedReviews = [...currentReviews, review];
          const totalReviews = updatedReviews.length;
          const averageRating = updatedReviews.reduce((acc, curr) => acc + (curr.rating || curr.estrellas || curr.puntuacion || 0), 0) / totalReviews;
          
          return { 
            ...venture, 
            reviews: updatedReviews,
            valoraciones: updatedReviews,
            resenas: updatedReviews,
            totalReviews: totalReviews,
            total_valoraciones: totalReviews,
            totalResenas: totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            promedio_valoracion: Number(averageRating.toFixed(1)),
            promedioEstrellas: Number(averageRating.toFixed(1))
          };
        }
        return venture;
      });
      return {
        ...prev,
        ventures: updatedVentures,
        emprendimientos: updatedVentures
      };
    });
  };

  const enrollInGroup = (groupId) => {
    setData(prev => {
      const activeStudent = prev.currentStudent || prev.estudianteActual;
      if (!activeStudent) return prev;
      const enrolledGroupIds = activeStudent.enrolledGroupIds || activeStudent.gruposInscritosIds || [];
      if (enrolledGroupIds.includes(groupId)) return prev;

      const groupList = prev.intermediateGroups || prev.gruposIntermedios || [];
      const updatedGroups = groupList.map(group => {
        if (group.id === groupId) {
          const availableSpots = group.availableSpots ?? group.cupos_disponibles ?? group.cuposDisponibles ?? 0;
          const updatedSpots = Math.max(0, availableSpots - 1);
          return {
            ...group,
            availableSpots: updatedSpots,
            cupos_disponibles: updatedSpots,
            cuposDisponibles: updatedSpots
          };
        }
        return group;
      });

      const updatedStudent = {
        ...activeStudent,
        enrolledGroupIds: [...enrolledGroupIds, groupId],
        gruposInscritosIds: [...enrolledGroupIds, groupId]
      };

      return {
        ...prev,
        intermediateGroups: updatedGroups,
        gruposIntermedios: updatedGroups,
        currentStudent: updatedStudent,
        estudianteActual: updatedStudent
      };
    });
  };

  return (
    <AppContext.Provider value={{ 
      ...data, 
      currentStudent: data.currentStudent || data.estudianteActual,
      ventures: data.ventures || data.emprendimientos,
      intermediateGroups: data.intermediateGroups || data.gruposIntermedios,
      loading, 
      error,
      toggleLike,
      toggleFavorite,
      addReview,
      enrollInGroup,
      resetData
    }}>
      {children}
    </AppContext.Provider>
  );
};