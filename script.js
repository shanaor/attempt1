document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        data.results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            
            const img = document.createElement('img');
            img.src = result.imageUrl;
            resultDiv.appendChild(img);
            
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('result-details');
            detailsDiv.innerHTML = `
                <p>Match found on: <a href="${result.profileUrl}">Social Media Profile</a></p>
                <p>Accuracy: ${result.accuracy}%</p>
            `;
            resultDiv.appendChild(detailsDiv);
            
            resultsContainer.appendChild(resultDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});
