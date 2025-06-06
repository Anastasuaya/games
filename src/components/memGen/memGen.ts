import './memGen.css'


const IMAGES: string[] = [
    './jokes/meme1.jpg',
    './jokes/meme2.jpg',
    './jokes/meme3.jpg',
    './jokes/meme4.jpg',
    './jokes/meme5.jpg',
    './jokes/meme6.jpg',
    './jokes/meme7.jpg',
    './jokes/meme8.jpg',
    './jokes/meme9.jpg',
    './jokes/meme10.jpg',
    './jokes/meme11.jpg',
]

const genBtn = document.getElementById('btn') as HTMLButtonElement
const imgContainer = document.getElementById('imgContainer') as HTMLDivElement

const generateImg = () => {
    genBtn.disabled = true
    imgContainer.innerHTML = ''

    setTimeout(() => { 
        const randomIndex: number = Math.floor(Math.random()* IMAGES.length)
        const img: HTMLImageElement = document.createElement('img')
        img.src = IMAGES[randomIndex]
        img.alt = "random image"

        img.onerror = () => {
            imgContainer.innerHTML = '<p>Error<p>'
        }

        imgContainer.appendChild(img)
        genBtn.disabled = false
    }, 500)

}

genBtn.addEventListener('click', generateImg)

generateImg()
