export const getAbbrName = (name: string) => {
  const nameParts = name.trim().split(' ').filter(part => part.length > 0);

  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }
  return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
}
