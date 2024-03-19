const getPos = document.getElementsByClassName('getPos')[0]

let positions = []

clear = () => positions = []

push = e => {
  const x = Math.floor(e.clientX - getPos.getBoundingClientRect().x)
  const y = Math.floor(e.clientY - getPos.getBoundingClientRect().y)
  positions.push(x, y)
  console.log(`Position stored: ${x}, ${y}`)
}

pop = () => {
  if (positions.length === 0) return
  const y = positions.pop()
  const x = positions.pop()
  console.log(`Removed: ${x}, ${y}`)
}

getPoly = () => {
  navigator.clipboard.writeText(positions.toString())
  console.log('Copied coords')
}

ctrlCopy = e => {
  if (e.ctrlKey && e.key === 'c')
    getPoly()
}

// Uncomment to turn on
//getPos.onmousedown = push


document.addEventListener('keydown', ctrlCopy)

// adjust image map

window.onload = () => {
  const ogW = 396
  const scale = getPos.getBoundingClientRect().width
  const maps = document.getElementsByTagName('area')
  for (let map of maps) {
    const coords = map.coords.split(',')
    for (let i in coords) {
      coords[i] = Math.round(coords[i] * (scale / ogW))
    }
    map.coords = coords.join(',')
  }
}
