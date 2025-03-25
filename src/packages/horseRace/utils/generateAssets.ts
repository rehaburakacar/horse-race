const horseColors = [
  'beige',
  'black',
  'blue',
  'brown',
  'gray',
  'pinto',
  'red',
  'tan',
  'white',
  'yellow'
]

export function getRandomColorAsset() {
  const color = horseColors[Math.floor(Math.random() * horseColors.length)]
  return {
    color,
    imagePath: `assets/horses/horse_${color}.gif`,
    staticImagePath: `assets/horses/horse_${color}_static.png`
  }
}
