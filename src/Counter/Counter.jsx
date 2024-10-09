// Se importa el hook useState para poder manejar el estado de ciertos componentes.
import { useState } from 'react';

function Counter() {
  // Se define un estado llamado `count` con un valor inicial de 0
  // `setCount` es la función que permite actualizar el valor de `count`
  const [count, setCount] = useState(0);

  // Se define la función `increment` para aumentar el valor de `count`
  const increment = () => setCount(count + 1);

  // Se define la función `decrement` para disminuir el valor de `count`
  const decrement = () => setCount(count - 1);

  // El componente retorna un bloque JSX que muestra el valor del contador (`count`)
  // y dos botones para incrementar y decrementar el valor del contador.
  return (
    <section>
      <h2>Contador: {count}</h2> {/* Muestra el valor actual del contador */}
      <button onClick={increment}>Incrementar</button> {/* Incrementar el valor del contador */}
      <button onClick={decrement}>Decrementar</button> {/* Decrementar el valor del contador */}
    </section>
  );
}

// Se exporta el componente
export default Counter;
