import { v4 as uuidv4 } from 'uuid'
import type { Horse } from '../../../store'
import { getRandomColorAsset } from './generateAssets'

const horseNames = [
  'Thunderbolt',
  'Majestic Star',
  'Wildfire',
  'Silver Streak',
  'Desert Wind',
  'Stormchaser',
  'Crimson Blaze',
  'Shadow Dancer',
  'Lightning Dash',
  'Golden Hoof',
  'Midnight Sun',
  'Firefly',
  'Ironclad',
  'Blue Comet',
  'Whirlwind',
  'Cinnamon Spirit',
  'Phantom Racer',
  'Braveheart',
  'Rapid Ember',
  'Ghost Runner'
]

export function generateHorses(): Horse[] {
  return Array.from({ length: 20 }, (_, index) => {
    const asset = getRandomColorAsset()
    return {
      id: uuidv4(),
      name: horseNames[index],
      imagePath: asset.imagePath,
      staticImagePath: asset.staticImagePath,
      conditionScore: Math.floor(Math.random() * 100) + 1
    }
  })
}

export function getRandomSubset(array: Horse[], size: number): Horse[] {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, size)
}
