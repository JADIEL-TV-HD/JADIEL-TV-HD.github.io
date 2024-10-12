document.getElementById('captureButton').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    if (url) {
        captureM3u8Urls(url);
    } else {
        alert('Por favor, insira uma URL válida.');
    }
});

function captureM3u8Urls(url) {
    // Exemplo de uso do fetch para capturar o conteúdo da URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a URL');
            }
            return response.text();
        })
        .then(data => {
            const m3u8Urls = extractM3u8Urls(data);
            displayResults(m3u8Urls);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Não foi possível capturar as URLs.');
        });
}

function extractM3u8Urls(data) {
    const regex = /https?:\/\/[^'"]+\.m3u8/g;
    return data.match(regex) || [];
}

function displayResults(urls) {
    const resultContainer = document.getElementById('resultContainer');
    const urlList = document.getElementById('urlList');

    urlList.innerHTML = ''; // Limpa a lista anterior

    if (urls.length > 0) {
        urls.forEach(url => {
            const listItem = document.createElement('li');
            listItem.textContent = url;
            urlList.appendChild(listItem);
        });
        resultContainer.style.display = 'block'; // Mostra a lista de resultados
    } else {
        resultContainer.style.display = 'none';
        alert('Nenhuma URL m3u8 encontrada.');
    }
}