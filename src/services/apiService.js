export const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch('/data/data.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 800);
  });
};