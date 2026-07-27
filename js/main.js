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

        // Metemos el checkbox y el span dentro del li (en orden)
        li.appendChild(checkbox);
        li.appendChild(span);

        // Metemos el li dentro de la lista
        listaTareas.appendChild(li);
    });
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
//   EVENTOS
// ============================================
btnAgregar.addEventListener("click", agregarTarea);