export default function capitalizeFirstLetters(input) {
    if (!input) return '';
    const replacedString = input.replace(/-/g, ' ');
  
    const capitalizedString = replacedString
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return capitalizedString;
  }