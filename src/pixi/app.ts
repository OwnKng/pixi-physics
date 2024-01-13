import { Application } from "@pixi/app"
import "@pixi/graphics-extras"
import { physics } from "./physics"
import { create_rect } from "./Rect"
import { create_earth, create_jupiter, create_moon, create_mars } from "./balls"
import "@pixi/events"

const { world } = physics

const create_planet = (x: number) =>
  [create_moon, create_earth, create_jupiter, create_mars][x]

export const create_app = async (
  container: HTMLDivElement,
  n_planets = 500
) => {
  const app = new Application({
    resizeTo: container,
    backgroundColor: 0x0e0f13,
  })

  //_ Planets
  const planets = new Array(n_planets).fill(0).map((_, i) => {
    const planet_function = create_planet(Math.floor(Math.random() * 4))

    return planet_function(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height),
      Math.random() * 20 + 10
    )
  })

  planets.forEach((planet) => app.stage.addChild(planet.sprite))

  //_ Boundaries
  const ground = create_rect(
    app.screen.width * 0.5,
    app.screen.height,
    app.screen.width,
    10
  )

  const left = create_rect(0, app.screen.height, 10, app.screen.height)
  const right = create_rect(
    app.screen.width,
    app.screen.height,
    10,
    app.screen.height
  )

  //_ Ticker
  app.ticker.add((delta) => {
    world.step()

    planets.forEach(({ tick }) => tick())
  })

  return app
}
