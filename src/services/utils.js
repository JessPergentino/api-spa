export const singularPlural = (numero, singular, plural) => {
  if (numero > 1) {
    return plural
  }
  return singular
}