
// Se importa `useEffect` y `useState` desde React, que permiten manejar estados y efectos secundarios.
// También Se importa `axios` para hacer peticiones HTTP
import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Asegúrate de importar el archivo de estilos

function UserList() {
  // Estado para almacenar los usuarios obtenidos del API.
  const [users, setUsers] = useState([]);
  // Estado para manejar si la aplicación está cargando.
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores en la petición.
  const [error, setError] = useState(null);
  // Estado para controlar cuántos usuarios se mostrarán.
  const [limit, setLimit] = useState(2); 

  // `useEffect` se ejecuta cuando el componente se monta y cada vez que cambia el valor de `limit`.
  useEffect(() => {
    // Función asíncrona para obtener los usuarios desde el API.
    const fetchUsers = async () => {
      try {
        // Realiza una petición GET a la API con un límite basado en el valor de `limit`.
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        setUsers(response.data); // Actualiza el estado con los datos obtenidos.
      } catch (err) {
        // Si hay un error, lo capturamos y guardamos en el estado `error`.
        setError(`Error: ${err.message}`);
      } finally {
        // Cuando la petición finaliza, independientemente de su éxito o fallo, establecemos `loading` en `false`.
        setLoading(false);
      }
    };

    // Llamamos a la función que obtiene los usuarios.
    fetchUsers();
  }, [limit]); // El efecto se dispara cuando `limit` cambia.

  // Función para aumentar el límite de usuarios mostrados.
  const handleIncrease = () => {
    setLimit((prevLimit) => Math.min(10, prevLimit + 1)); // Limita el incremento a un máximo de 10 usuarios (El máximo que el API trabaja)
  };

  // Función para disminuir el límite de usuarios mostrados.
  const handleDecrease = () => {
    setLimit((prevLimit) => Math.max(1, prevLimit - 1)); // Limita la disminución a un mínimo de 1 usuario.
  };

  // Si la información está cargando, mostramos un mensaje de "Cargando usuarios...".
  if (loading) return <div>Cargando usuarios...</div>;

  // Si hay un error, lo mostramos en pantalla.
  if (error) return <div>{error}</div>;

  // Si todo está bien, renderizamos los usuarios en un diseño de tarjetas.
  return (
    <>
      <h2>Obtener elementos de un API</h2>
      <div className="user-grid">
        {users.map(user => (
          // Por cada usuario, creamos una "tarjeta" que muestra su nombre, email, teléfono y compañía.
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Compañía: {user.company.name}</p>
          </div>
        ))}
      </div>
      {/* Botones para aumentar o disminuir la cantidad de usuarios mostrados */}
      <div>
        <div className="user-buttons">
          <p>Datos mostrados actualmente: {limit}</p><br />
          <button onClick={handleDecrease}>Mostrar menos</button>
          <button onClick={handleIncrease}>Mostrar más</button>
        </div>
      </div>
    </>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación.
export default UserList;
