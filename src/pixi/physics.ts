const import_rapier = async () => {
  let r = await import("@dimforge/rapier2d-compat")
  await r.init()
  return r
}

const rapier = await import_rapier()

const gravity = { x: 0.0, y: 10 }

const pixels_per_meter = 100
const pixels_to_si = 1 / pixels_per_meter

const to_si = (pixels: number) => pixels * pixels_to_si

const to_pixels = (meters: number) => meters * pixels_per_meter

export const physics = {
  rapier,
  world: new rapier.World(gravity),
  to_si,
  to_pixels,
}
