import './matrix.css'

declare var dat: any

const state = {
    fps: 60,
    color: '#0f0',
    charset: '0123456789ABCDEF',
    size: 10
}

const gui = new dat.GUI()
const fpsCtrl = gui.add(state, 'fps').min(1).max(120).step(1)
gui.addColor(state, 'color')
gui.add(state, 'charset')
const sizeCtrl = gui.add(state, 'size').min(1).max(120).step(1)

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
let w: number, h: number, p: number[]

const resize = () => {
    w = canvas.width = innerWidth
    h = canvas.height = innerHeight
    p = Array(Math.ceil(w / state.size)).fill(0)
}

window.addEventListener('resize', resize)
sizeCtrl.onFinishChange(() => resize())
resize()

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = state.color
    ctx.font = `${state.size}px monospace`

    p.forEach((y, index) => {
        const text = state.charset[Math.floor(Math.random() * state.charset.length)]
        const x = index * state.size
        ctx.fillText(text, x, y)

        // Moving the "drop" down
        if (y > h && Math.random() > 0.975) {
            p[index] = 0
        } else {
            p[index] = y + state.size
        }
    })
}

const loop = () => {
    draw()
    setTimeout(loop, 1000 / state.fps)
}

loop()
