document.addEventListener('DOMContentLoaded', async function() {
    const postList = document.getElementById('postsList');

    try {
        const response =  await fetch('./backend/publicaciones.php');
        const data = await response.json();
        

        if (data.success && data.post.length > 0) {
            postList.innerHTML = ''; // Limpiar el mensage de carga
        
            data.posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content_preview}</p>
                    <div class="meta">Publicado por ${post.author_name} el ${new Date(post.created_at).toLocaleDateString()}</div>
                    <a href=post.html?id=${post.id}">Leer más</a>

                `;
                postsList.apprendChild(postCard);
            });
        } else {
            postsList.innerHTML = `<p class="text-center texgt-muted">${data.message || 'No se pudieron cargar las publicaciones.'}</p>`;
        }

    } catch (error) {
        console.error('Error al cargar las publicacioness:', error);
        postsList.innerHTML = `<p class="text-center text-danger">Error al conectar con el servidor para cargar las publicaciones.</p>`;
    
    }
});