let chars = []

const fetchCharacters = async () => {
    try {
        const response = await fetch('https://finalspaceapi.com/api/v0/character/');
        const characters = await response.json();
        chars = characters
    } catch (error) {
        console.log(error);
    }
};

fetchCharacters().then(() => showCharacters())

const showCharacters = () => {
    const charGrid = document.querySelector('#charGrid')
    chars.forEach((char) => {
        const charCard = document.createElement('article')
        charCard.classList.add('charCard')
        charCard.innerHTML = `
            <img src="${char.img_url}" alt="${char.name} photo" />
            <h2>${char.name}</h2>
        `
        const charButton = document.createElement('button')
        charButton.innerText = 'Read more'
        charButton.classList.add('charButton')
        charButton.onclick = () => showDetails(char.id)
        charCard.appendChild(charButton)
        charGrid.append(charCard)
    })
}

const showDetails = (id) => {
    const char = chars.find(char => char.id === id)
    const modal = document.querySelector('#charDetails')

    modal.innerHTML = `
        <img src="${char.img_url}" alt="${char.name} photo" />
        <h2>${char.name}</h2>
        <ul>
            <li><b>Specie:</b> ${char.species}</li>
            <li><b>Origin:</b> ${char.origin}</li>
            <li><b>Gender:</b> ${char.gender}</li>
            <li><b>Status:</b> ${char.status}</li>
        </ul>
    `
    const closeButton = document.createElement('button')
    closeButton.innerText = 'Close'
    closeButton.classList.add('charButton')
    closeButton.onclick = () => modal.close()
    modal.appendChild(closeButton)

    modal.showModal()
}
