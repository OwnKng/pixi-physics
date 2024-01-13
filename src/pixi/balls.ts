import { physics } from "./physics"
import { Sprite } from "@pixi/sprite"

const { rapier, to_si, to_pixels } = physics

export const create_ball = (x: number, y: number, r: number, src: string) => {
  const sprite = Sprite.from(src)
  sprite.anchor.set(0.5)
  sprite.width = r * 2
  sprite.height = r * 2

  sprite.position.set(x, y)

  // Physics layer
  const rigidBody = rapier.RigidBodyDesc.dynamic().setTranslation(
    to_si(sprite.x),
    to_si(sprite.y)
  )

  const body = physics.world.createRigidBody(rigidBody)

  const collider = rapier.ColliderDesc.ball(to_si(r))
  physics.world.createCollider(collider, body)

  //_ Interaction
  sprite.eventMode = "static"

  const handleClick = () => body.applyImpulse({ x: 0, y: -2.4 }, true)

  sprite.on("touchstart", handleClick)
  sprite.on("mouseover", handleClick)

  const tick = () => {
    const position = body.translation()

    sprite.position.set(to_pixels(position.x), to_pixels(position.y))

    const rotation = body.rotation()
    sprite.rotation = rotation
  }

  return {
    sprite,
    tick,
    body,
  }
}

export const create_moon = (x: number, y: number, r: number) =>
  create_ball(x, y, r, "moon.png")

export const create_earth = (x: number, y: number, r: number) =>
  create_ball(x, y, r, "earth.png")

export const create_mars = (x: number, y: number, r: number) =>
  create_ball(x, y, r, "mars.png")

export const create_jupiter = (x: number, y: number, r: number) =>
  create_ball(x, y, r, "jupiter.png")
