document.addEventListener("DOMContentLoaded", function(){
    // Este script maneja la funcionalidad de los dropdowns multinivel (sub-submenús)
    // y asegura que los clicks en los elementos 'dropdown-toggle' de submenùs no cierrren el dropdown principal 

    // Selecciona todos los 'dropdowns-toggle' que están dentro de un 'dropdown-submenu'
    document.querySelectorAll('.dropdown-menu . dropdown-submenu .dropdown-toggle'). forEach (function(element){
        element.addEventListener('click', function (e) {
            let nextEl = this.nextElementSibiling; // El  'ul.dropdown-menu' asociado a este toggle

            if (nextEl && nextEl.classList.contains('dropdown-menu')) {
                e.preventDefault(); //Evita que el enlace del submenú navegue a '#' (si tiene un href)
                e.stopPropagation(); //¡Crucial! Evita que el click se propague el dropdown padre y lo cierre
            
            // Cierra otros submenús abiertos en el mismo nivel
            // Esto es para que solo se abra a la vez en el nivel
            let parentDropdown = this.closest('.dropdown-menu'); // Busca el 'dropdown-menu' padre
            parentDropdown.querySelectorAll ('.dropdown-submenu .dropdown-menu.show') .forEach(function(menu) {
                if (menu !== nextEl) { //Si el menú no es el que se está abriendo/cerrando
                menu.classList.remove('show'); // Lo cierra    
                }
            });

            // Alternar la visibilidad del submenú actual
            nextEl.classList.toggle('show');
        }
    });
});

    // Cierra todos los submenús anidados cuando el dropdown principal de la navbar se cierra
    // Esto es importante para que el menú esté "limpio" si el usuario hace click fuera de la navbar
    document.querySelectorAll ('.navbar. dropdown'). forEach(function(everydropdown) {
        everydropdown.addEventListener ('hidden.bs.dropdown', function () {
            // Encuentra todos los submenús dentro de este dropdown principal y los oculta
            this.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(function(everysubmenu) {
                everysubmenu.classList.remove('show');
            });
        });
    });
});

/* Efecto scroll */

document.addEvelListener('DOMContentLoaded', function() {
    const martilloContainers = document.querySelectorAll ('.icon-text-wrapper'); // Selecciona los contenedores de los martillos
    const scrollThershold = 100; //Define a qué distancia de scroll quieres que se active el efecto (en píxeles)

    function handlesScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        martilloContianer.forEach(container => {
            const containerRect = container.getBoundingClientRect();
            //Determina si el elemento está visibl en la mitad superior de la ventana
            const isVisible = (containerRect.top < (window.innerHeight / 2 )) && (containerRect.bottom > 0);

            if (scrollY > scrollThreshold && isVisible) {
                container.classList.add('icon-martillo-scrolled');
            } else {
                container.classList.remove('icon-martillo-scrolled');
            }
        });
    }

    //Un pequeño retraso para asegurar que los elementos se han renderizado antes de la primera
    setTimeout(handlesScroll, 100);
    // Escuchar el evento de scroll y rendimensionamiento
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handLesSroll);
});

