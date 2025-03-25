import type { Horse } from '../../../store'

export function simulateRace(horses: Horse[], distance: number): Horse[] {
  const raceStates = horses.map(horse => {
    let position = 0
    let fatigue = 0
    let momentum = Math.random() * 1.2 + 0.8

    while (position < distance) {
      const boost = Math.random() * 20
      const baseSpeed = horse.conditionScore / 10
      const step = baseSpeed * momentum + boost - fatigue

      position += Math.max(0.5, step)
      fatigue += Math.random() * 0.5
      momentum += (Math.random() - 0.5) * 0.1
    }

    return {
      ...horse,
      finishTime: position
    }
  })

  raceStates.sort((a, b) => a.finishTime - b.finishTime)

  return raceStates.map(({ finishTime, ...horse }) => horse)
}
