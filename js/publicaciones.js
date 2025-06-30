document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const postDetailTitle = document.getElementById('postDetailTitle');
    const postAutor = document.getElementById('postAuthor');
    const postDate = document.getElementById('postDate');
    const postContent = document.getElementById('postContent');
    const commentsList = document.getElementById('commentsList');
    const commentsCount = document.getElementById('commentsCount');
    const commentForm = document.getElementById('commentForm');
    const commentTextarea = document.getElementById('commentText');
    const commentResponseMessage = document.getElementById('commentResponseMessage');
    const loggedInUsernameSpan = document.getElementById('loggedInUsername');
    const loginPrompt = document.getElementById('loginPrompt');

    if(!postId) {
        postDetailTitle.textContent = 'Error: ID de publicación no encontrado.';
        postContent.innerHTML = '<p>Por favor, asegúrate se acceder a esta página desde un enlace de publicación válido. </p>';
        return;
    }

    // Función para renderizar comentarios 
    function renderComments(comments) {
        commentsList.innerHTML = '';
        commentsCount.textContent = comments.length;
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="text-muted">No hay comentarios aún. ¡Sé el primero!</p>';
            return;  
        }

        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem;classList.add('comment.item');
            commentItem;innerHTML = `
                <div class="comment-author">${comment.commenter_name}</div>
                <div class="comment-date">${new Date(comment.created_at).toLocaleString()}</div>
                <div class="comment-text">${comment.comment_text}</div>
                `;
                commentsList.appendChild(commentItem);
        });
    }

    //Cargar detalles de la publicación y comentarios
    try {
        const response = await fetch(`./backend/publicaciones_detalles.php?id=${postId}`);
        const data = await response.json();

        if (data.success && data.post) {
            document.title = data.post.title + ' - Blog'; //Actualizar el título de la página 
            postDetailTitle.textContent = data.post.title;
            postAuthor.textContent = data.post.author_name;
            postDate.textContent = new Date (data.post.created_at).toLocaleDateString();
            postContent.innerHTML = data.post.content; // Usar innerHTML para el contenido, asumiendo HTML seguro

            renderComments(data.comments);

            //Mostrar u ocultar el formulario de comentarios
            if (data.is_logged_in) {
                loggedInUsernameSpan.textContent = data.current_username;
                commentForm.style.display = 'block'; // Mostrar el formulario
                loginPrompt.style.display = 'none'; // Ocultar el mensage de "inicar sesión"
        } else {
            commentForm.style.display = 'none'; // Ocultar el formulario 
            loginPrompt.style.display = 'block'; // Mostrar el mensaje de "inicar sesión"
        }
        
    } else {
        postDetailTitle.textContent = 'Publicación no encontrada.';
        postContent.innerHTML = `<p class="text-danger">${data.message || 'Hubo un problema al cargar la publicación.'}</p>`;
        document.title = 'Error - Blog';
    }    
} catch (error) {
    console.error('Error al cargar la publicación:', error);
    postDetailTitle.textContent = 'Error de conexión.';
    postContent.innerHTML = '<p class="text-danger"> No se pudo conectar con el servidor para cargar la publicación.</p>';
    document.title = 'Error - blog';
}

// Manejar el envio del formulario de comentarios
if (commentForm) {
    commentForm.addEvenListener('submit', async function(event) {
        event.preventDefault();

        if(!commentTextarea.value.trim()) {
            commentResponseMessage.textContent = 'Por favor, escribe un comentario.';
            commentResponseMessage.style.color = 'red';
            return;
        }

        commentResponseMessage.textContent = 'Enviando cometario...';
        commentResponseMessage.style.color = '#007nff';

        const formData = new FormData();
        formData.append('post_id', postId);
        formData.append('comment_text', commentTextarea.value.trim());

        try {
            const response = await fetch('./backend/añadir_comentario.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                commentResponseMessage.textContent = data.message;
                commentResponseMessage.style.color= 'green';
                commentTextarea.value = ''; // Limpiar el textarea
                // Añadir el nuevo comentario al DOM sin recarga
                const newComment = {
                    comment_text: data.comment.comment_text,
                    commenter_name: data.comment.commenter_name,
                    created_at: data.comment.created_at
                };
                // Asegúrate de que commentsLists no tenga el mensage "No hay comentarios aún"
                if (commentsList.querySelector('.text-muted')) {
                    commentsList.innerHTML = '';
                }
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.innerHTML = `
                    <div class="comment-author">${newComment.commenter_name}</div>
                    <div class="comment-date">${new Date(newComment.created_at).toLocaleString()}</div>
                    <div class="comment-text">${newComment.comment_text}</div>
                `;
                commentsList.appendChild(commentItem);
                commentCount.textContent = parseInt(commentsCount.textCountent) + 1; // Actualizar el contador

            } else {
                commentResponseMessage.textContent = data.message;
                commentResponseMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error al enviar comentario:', error);
            commentResponseMessage.textContent = 'Error de conexión al enviar el comentaro,';
            commentResponseMessage.style.color = 'red';
        }       
    }); 
}

});