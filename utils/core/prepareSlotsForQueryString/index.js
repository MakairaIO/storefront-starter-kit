function byValidValues(slot) {
  const value = slot[1]

  return Boolean(value)
}

export default function prepareSlotsForQueryString(slots = []) {
  // filter empty slots
  const filteredSlots = Array.from(slots).filter(byValidValues)

  return filteredSlots.reduce((slotObject, current) => {
    const [name, value] = current

    slotObject[name] = value

    return slotObject
  }, {})
}
