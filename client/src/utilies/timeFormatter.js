function timeFormatter(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = Math.floor((currentDate - createdDate) / 1000); // Convert to seconds
  
    if (timeDifference < 1) {
      return "just now";
    } else if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference === 1 ? '' : 's'} ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (timeDifference < 604800) { // Less than 7 days
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (timeDifference < 2419200) { // Less than 4 weeks (approximately 28 days)
      const weeks = Math.floor(timeDifference / 604800);
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (timeDifference < 29030400) { // Less than 11 months (approximately 11  30  24  60  60 seconds)
      const months = Math.floor(timeDifference / 2419200);
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
      const years = Math.floor(timeDifference / 29030400);
      return `${years} year${years === 1 ? '' : 's'} ago`;
    }
  }

export default timeFormatter;