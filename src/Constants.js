
import { getRandomColor } from './randomcolor'

export const canvas = document.getElementById('screen')
export const context = canvas.getContext('2d')
export const screenSize = {
  x: canvas.width,
  y: canvas.height
}
export const colors = {
  player: '#972D07',
  bullets: '#ED1C24',
  aliens: getRandomColor()
}
