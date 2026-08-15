// ============================================
//   REFERENCIAS A LOS ELEMENTOS DEL HTML
// ============================================
const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const mensajeVacio = document.getElementById("mensajeVacio");

const statTotal = document.getElementById("statTotal");
const statPendientes = document.getElementById("statPendientes");
const statCompletadas = document.getElementById("statCompletadas");

// ============================================
//   LOS DATOS
// ============================================
let tareas = [];

// ============================================
//   FUNCIÓN: agregar una tarea
// ============================================
function agregarTarea() {
    // 1. Leemos lo que el usuario escribió
    const texto = inputTarea.value;

    // 2. Si está vacío, no hacemos nada
    if (texto === "") {
        return;
    }

    // 3. Creamos la tarea como un objeto
    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    // 4. La metemos en el array de datos
    tareas.push(nuevaTarea);

    // 5. Limpiamos el input
    inputTarea.value = "";

    // 6. Volvemos a dibujar la lista en pantalla
    renderizarTareas();
}

// ============================================
//   FUNCIÓN: dibujar las tareas en pantalla
// ============================================
function renderizarTareas() {
    // 1. Vaciamos la lista antes de redibujar
    listaTareas.innerHTML = "";

    // 2. Recorremos cada tarea del array
    tareas.forEach(function (tarea) {
        // Creamos el <li>
        const li = document.createElement("li");
        li.className = "tarea";

        // Si la tarea está completada, le agregamos la clase modificadora
        if (tarea.completada === true) {
            li.classList.add("tarea--completada");
        }

        // Creamos el checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "tarea__checkbox";
        checkbox.checked = tarea.completada;

        // Cuando se marca o desmarca, cambiamos el estado
        checkbox.addEventListener("change", function () {
            completarTarea(tarea.id);
        });

        // Creamos el <span> con el texto
        const span = document.createElement("span");
        span.className = "tarea__texto";
        span.textContent = tarea.texto;

        // Creamos el botón de borrar
        const btnBorrar = document.createElement("button");
        btnBorrar.className = "tarea__borrar";
        btnBorrar.textContent = "Borrar";

        // Cuando se hace click, borramos esta tarea
        btnBorrar.addEventListener("click", function () {
            borrarTarea(tarea.id);
        });

        // Metemos todo dentro del li (en orden)
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnBorrar);

        // Metemos el li dentro de la lista
        listaTareas.appendChild(li);
    });

    // 3. Actualizamos los contadores
    actualizarStats();
}

// ============================================
//   FUNCIÓN: marcar una tarea como completada
// ============================================
function completarTarea(id) {
    // Recorremos las tareas y buscamos la del id que llegó
    tareas.forEach(function (tarea) {
        if (tarea.id === id) {
            tarea.completada = !tarea.completada;
        }
    });

    // Redibujamos
    renderizarTareas();
}

// ============================================
//   FUNCIÓN: borrar una tarea
// ============================================
function borrarTarea(id) {
    // Nos quedamos solo con las tareas que NO tengan ese id
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });

    // Redibujamos
    renderizarTareas();
}

// ============================================
//   FUNCIÓN: actualizar los contadores
// ============================================
function actualizarStats() {
    // Total: cuántas tareas hay
    const total = tareas.length;

    // Completadas: filtramos las que están completadas y contamos
    const completadas = tareas.filter(function (tarea) {
        return tarea.completada === true;
    }).length;

    // Pendientes: el total menos las completadas
    const pendientes = total - completadas;

    // Mostramos cada número en su lugar
    statTotal.textContent = total;
    statCompletadas.textContent = completadas;
    statPendientes.textContent = pendientes;
}

// ============================================
//   EVENTOS
// ============================================
btnAgregar.addEventListener("click", agregarTarea);