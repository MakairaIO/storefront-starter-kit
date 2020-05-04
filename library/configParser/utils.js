function normalize(string) {
  return string.replace(/(^[ \t]*\n)/gm, '') // trim empty lines
}

function addEmptyLine(string) {
  return string + '\n'
}

function rem(unit) {
  return (unit / 10).toFixed(3) + 'rem'
}

module.exports = {
  normalize,
  addEmptyLine,
  rem,
}
