import { physics } from "./physics"

const { rapier, to_si } = physics

export const create_rect = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const collider = rapier.ColliderDesc.cuboid(
    to_si(width * 0.5),
    to_si(height * 0.5)
  )

  collider.setTranslation(to_si(x), to_si(y - height * 0.5))

  physics.world.createCollider(collider)

  return collider
}
