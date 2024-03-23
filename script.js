const locate = document.getElementsByClassName('locate')[0];

let positions = [];

clear = () => positions = [];

push = e => {
  const x = Math.floor(e.clientX - locate.getBoundingClientRect().x);
  const y = Math.floor(e.clientY - locate.getBoundingClientRect().y);
  positions.push(x, y);
  console.log(`Position stored: ${x}, ${y}`);
}

pop = () => {
  if (positions.length === 0) return;
  const y = positions.pop();
  const x = positions.pop();
  console.log(`Removed: ${x}, ${y}`);
}

getPoly = () => {
  navigator.clipboard.writeText(positions.toString());
  console.log('Copied coords');
}

ctrlCopy = e => {
  if (e.ctrlKey && e.key === 'c')
    getPoly();
}

// Uncomment to turn on
// locate.onmousedown = push;


document.addEventListener('keydown', ctrlCopy);

// adjust image map

window.onload = () => {
  const maps = document.getElementsByTagName('area');

  for (let map of maps) {
    const coords = map.coords.split(',');

    for (let i in coords) {
      const w = locate.getBoundingClientRect().width;
      const h = locate.getBoundingClientRect().height;
      const wog = 2135 * (w / h);
      const hog = 2135;

      if (i % 2 === 0) {
        coords[i] = Math.round((coords[i]) * (w / wog));
      } else {
        coords[i] = Math.round((coords[i]) * (h / hog));
      }

    }

    map.coords = coords.join(',');
  }
}

//window.onresize = window.onload
