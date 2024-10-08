export default function capitalizeFirstLetters(input) {
    // Replace dashes with spaces
    const replacedString = input.replace(/-/g, ' ');
  
    // Capitalize first letter of each word
    const capitalizedString = replacedString
      .split(' ') // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(' '); // Join back into a string
  
    return capitalizedString;
  }