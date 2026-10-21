# Plataforma Estudiantil Utal

Una aplicación web desarrollada con **React** y **Vite** diseñada para conectar a la comunidad universitaria mediante la difusión de emprendimientos estudiantiles y la gestión de grupos intermedios.

---

## Cómo Empezar

### Prerrequisitos
- **Node.js** 
- **npm**

### Instalación y Ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## Apartados del Proyecto

### 1. Encabezado y Navegación (`Header`)
- Permite alternar entre la vista de **Emprendimientos** y **Grupos Intermedios**.
- Muestra el nombre del estudiante conectado actualmente.
- **Reiniciar datos:** Botón que restablece la información al estado original del archivo de datos (`data.json`), limpiando el almacenamiento local.

### 2. Catálogo de Emprendimientos (`Catalog` & `Card`)
- **Buscador en tiempo real:** Permite filtrar por nombre o categoría/clasificación del emprendimiento.
- **Filtro de Favoritos:** Botón para alternar entre ver todos los emprendimientos o únicamente los guardados por el usuario.
- **Tarjeta de Emprendimiento:**
  - Información principal: nombre, categoría, descripción, campus y valoración promedio con número de reseñas.
  - **Favoritos:** Guarda o retira el emprendimiento de la lista personal del estudiante.
  - **Likes:** Permite sumar apoyo a los emprendimientos.
  - **Contactar:** Muestra los canales oficiales de contacto disponibles (Instagram, teléfono, correo).
- **Valoraciones (`ReviewModal`):** Permite calificar con estrellas (1 a 5) y dejar un comentario, recalculando automáticamente el promedio de valoraciones.

### 3. Directorio de Grupos Intermedios (`Directory` & `GroupCard`)
- **Buscador temático:** Filtra grupos por nombre o área temática.
- **Filtro Mis Grupos:** Permite visualizar rápidamente aquellos grupos en los que el estudiante ya está inscrito.
- **Tarjeta de Grupo:**
  - Detalla campus, horarios de reunión y requisitos de postulación.
  - **Gestión de Cupos:** Control en tiempo real de cupos disponibles.
  - **Inscripción:** Permite unirse a un grupo, reduciendo automáticamente los cupos disponibles e identificando al usuario como miembro activo.

---

## Arquitectura y Funcionamiento Interno

- **Estado Global (`AppContext`):** Centraliza los datos del estudiante autenticado, la lista de emprendimientos y los grupos intermedios.
- **Persistencia Local (`localStorage`):** Cada acción (marcar favorito, dar like, inscribirse a un grupo o añadir reseña) se sincroniza de forma transparente en el almacenamiento del navegador, manteniendo los cambios al recargar.
- **Carga de Datos Simulada (`apiService`):** Consume un archivo estático `public/data/data.json` simulando una llamada asíncrona a una API REST con manejo de estados de carga (`loading`) y errores (`error`).
- **Estilos Modulares:** CSS estructurado por componentes con variables CSS globales (`global.css`) para una interfaz consistente y ligera.

---

## Estructura del Código

```text
src/
├── components/
│   ├── entrepreneurships/   # Catálogo, tarjetas y modal de reseñas
│   ├── groups/              # Directorio y tarjetas de grupos intermedios
│   └── layout/              # Header y contenedor general
├── context/
│   └── AppContext.jsx       # Proveedor de estado global y persistencia
├── services/
│   └── apiService.js        # Servicio de consumo de datos simulado
├── styles/
│   └── global.css           # Variables de diseño y estilos globales
├── App.jsx                  # Componente raíz y control de vistas
└── main.jsx                 # Punto de entrada de React
```
