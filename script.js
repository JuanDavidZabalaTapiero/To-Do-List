document.addEventListener('DOMContentLoaded', () => {
    let input_tarea = document.getElementById("input_tarea");

    let btn_add_task = document.getElementById("btn_add_task");

    let div_tareas = document.getElementById("div_tareas");

    // MOSTRAR EL SELECT DE ORDEN
    let select_order = document.querySelector(".select_order");

    // ARRAY DE LAS TAREAS
    let array_tareas = [];

    // AÑADIR UNA TAREA AL DAR CLICK EN AÑADIR
    btn_add_task.addEventListener('click', function () {
        if (input_tarea.value !== "") {
            addTask()
        }
    });

    document.addEventListener('keydown', function (event) {
        if (input_tarea.value !== "") {
            if (event.key === 'Enter') {
                addTask();
            }
        }
    });

    // AÑADIR TAREA
    function addTask() {
        // CREO EL DIV CONTENEDOR
        let div_tarea = document.createElement("div");
        div_tarea.classList.add("div_tarea");

        // CREO EL SPAN PARA EL TEXTO
        let span_tarea = document.createElement("span");
        span_tarea.textContent = input_tarea.value;

        // CREO EL I PARA EL ICONO DE ELIMINAR
        let i_delete = document.createElement("i");
        i_delete.classList.add("bi");
        i_delete.classList.add("bi-trash-fill");

        // CREO EL INPUT DE LA FECHA
        let input_fecha = document.createElement("input");
        input_fecha.type = "date";

        // DIV DEL TEXT Y BTN
        let div_1 = document.createElement("div");
        div_1.classList.add("main_tarea");

        // AÑADO EL SPAN AL DIV
        div_1.appendChild(span_tarea);

        // AÑADO EL I AL DIV
        div_1.appendChild(i_delete);

        // AÑADO EL DIV AL DIV PADRE
        div_tarea.appendChild(div_1);

        // DIV DE LA FECHA
        let div_2 = document.createElement("div");

        // AÑADO EL INPUT DE LA FECHA AL DIV
        div_2.appendChild(input_fecha);

        // AÑADO EL DIV DE LA FECHA AL DIV PADRE
        div_tarea.appendChild(div_2);

        // AÑADO EL DIV AL DIV PADRE
        div_tareas.appendChild(div_tarea);

        array_tareas.push(div_tarea);

        console.log(array_tareas);

        input_tarea.value = "";

        showSelectOrder();

        // ELIMINAR LA TAREA
        i_delete.addEventListener('click', function () {
            div_tarea.remove();

            showSelectOrder();
        });

        // SUBRAYAR UNA TAREA
        span_tarea.addEventListener('click', function () {
            span_tarea.classList.toggle("completed_task");
        });
    }

    // ORDENAR
    select_order.addEventListener('change', function () {
        let select_value = select_order.value;

        if (select_value == "Fecha") {
            array_tareas.sort((a, b) => {
                let fechaA = new Date(a.querySelector('input[type="Date"]').value);
                let fechaB = new Date(b.querySelector('input[type="Date"]').value);
                return fechaA - fechaB;
            });

            div_tareas.innerHTML = "";

            array_tareas.forEach(tarea => div_tareas.appendChild(tarea));
        }

        if (select_value == "Nombre") {
            array_tareas.sort((a, b) => {
                let nombreA = a.querySelector("span").textContent.toLowerCase();
                let nombreB = b.querySelector("span").textContent.toLowerCase();
                return nombreA.localeCompare(nombreB);
            });

            div_tareas.innerHTML = "";

            array_tareas.forEach(tarea => div_tareas.appendChild(tarea));
        }
    });

    // MOSTRAR EL SELECT O NO
    function showSelectOrder() {
        // MUESTRO EL SELECT
        if (div_tareas.querySelector(".div_tarea")) {
            select_order.classList.add("show_select");
        } else {
            select_order.classList.remove("show_select");
        }
    }
});