export const getTime = (time) => {
  let num = time
  const seconds = num % 60
  num = parseInt(num / 60, 10)
  const mins = num % 60
  num = parseInt(num / 60, 10)
  const hours = num % 24
  num = parseInt(num / 24, 10)
  const day = num
  return [day, hours, mins, seconds]
}

export default {}
