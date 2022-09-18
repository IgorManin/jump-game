const multipleAdder = (el, elArr) => elArr.reduce((acc, cur) => {
    acc.appendChild(cur)
    return acc
}, el)

let count = 0

const elementCreator = (element, className, content, id) => {
    const el = document.createElement(element);
    el.className = className;
    el.innerHTML = content || null

    if (id) {
        el.id = id
    }

    return el
}

const updateStorage = () => {
    if (count <= localStorage.getItem('count')) {
        alert('Попробуй еще раз')
        returnToMainMenu()
    } else {
        let name = prompt('как вас зовут')
        alert('это новый рекорд!')
        localStorage.setItem('count', count);
        localStorage.setItem('name', name);
        returnToMainMenu()
        window.location.reload()
    }
}

const returnToMainMenu = () => {
    removeBlock('root', 'gameBlock')
    root.appendChild(createMainMenu())
    count = 0
    document.removeEventListener("keydown", jumpHeadFunction, true)
    clearInterval(isAlive)
}

const createMainMenu = () => {
    const cardBlock = elementCreator('div', 'cardBlock', null, 'cardBlock')
    const header = elementCreator('div', 'header')
    const substrate = elementCreator('div', 'substrate')
    const p = elementCreator('p', 'text', 'Choose your player')
    const personCard = elementCreator('div', 'personCard')
    const footer = elementCreator('div', 'footer')
    const topResult = elementCreator('div', 'topResult')
    const wrapperResult = elementCreator('div', 'wrapperResult')
    const wrapperLocalStorage = elementCreator('div', 'wrapperLocalStorage')
    const topCount = elementCreator('div', 'localStor', localStorageCount?.toString() || 'Нет данных')
    const topName = elementCreator('div', 'localStor', localStorageName?.toString() || 'Нет данных')
    const name = elementCreator('div', 'playerResult', 'Игрок:')
    const result = elementCreator('div', 'playerResult', 'Результат:')

    header.appendChild(substrate).appendChild(p)
    footer.appendChild(topResult).appendChild(wrapperResult)
    topResult.appendChild(wrapperLocalStorage)
    wrapperResult.appendChild(name)
    wrapperResult.appendChild(result)

    wrapperLocalStorage.appendChild(topName)
    wrapperLocalStorage.appendChild(topCount)

    const cardsArray = personsId.map((person) => elementCreator('div', "card", null, person))
    cardsArray.forEach((card) => card.addEventListener('click', (event) => choosePerson(event.target.id)))
    multipleAdder(personCard, cardsArray)
    multipleAdder(cardBlock, [header, personCard, footer])

    const cardBlockFragment = document.createDocumentFragment()
    cardBlockFragment.appendChild(cardBlock)
    return cardBlockFragment
}

const createGameBlock = (id) => {
    const gameBlock = elementCreator('div', 'gameBlock', null, 'gameBlock')
    const currentGameBlock = elementCreator('div', 'currentGameBlock')
    const button = elementCreator('button', 'returnToMainMenu', 'Choose another player')
    button.addEventListener('click', () => returnToMainMenu())
    const face = elementCreator('div', 'person currentFace', null, id)
    const piki = elementCreator('div', 'piki')
    const count = elementCreator('div', 'count')

    multipleAdder(currentGameBlock, [face, piki])
    gameBlock.appendChild(currentGameBlock).appendChild(count)
    gameBlock.appendChild(button)

    const gameBlockFragment = document.createDocumentFragment()
    gameBlockFragment.appendChild(gameBlock)

    isAlive = setInterval(function () {
        let personCurrentFaceTop = parseInt(window.getComputedStyle(face).getPropertyValue('top'))
        let personCurrentPikiLeft = parseInt(window.getComputedStyle(piki).getPropertyValue('left'))

        if (personCurrentPikiLeft < 50 && personCurrentPikiLeft > 0 && personCurrentFaceTop >= 140) {
            updateStorage()
        }
    }, 10)
    return gameBlockFragment
}

const removeBlock = (parent, target) => document.getElementById(parent).removeChild(document.getElementById(target))

const choosePerson = (id) => {
    removeBlock('root', 'cardBlock')
    root.appendChild(createGameBlock(personProperties[id]))
    document.addEventListener("keydown", jumpHeadFunction, true)
}

const jumpHeadFunction = function jumpHead() {
    count++
    document.querySelector('.count').innerHTML = count.toString();
    let face = document.querySelector('.currentFace')
    face.classList.add('jump')
    setTimeout(() => face.classList.remove('jump'), 300)
}

const personsId = ["personCaptain-Memo", "personSerious-sam", "personLebovski-andrik"]

const personProperties = {
    [personsId[0]]: 'Captain-Memo',
    [personsId[1]]: 'Serious-sam',
    [personsId[2]]: 'Lebovski-andrik',
}

let isAlive
let localStorageCount = localStorage.getItem('count')
let localStorageName = localStorage.getItem('name')

//init
let root = document.getElementById('root')

if (root) {
    root.appendChild(createMainMenu())
}












