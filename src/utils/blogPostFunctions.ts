export function blogPostedTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 }, // 365 days
    { label: "month", seconds: 2592000 }, // 30 days
    { label: "week", seconds: 604800 }, // 7 days
    { label: "day", seconds: 86400 }, // 24 hours
    { label: "hour", seconds: 3600 }, // 60 minutes
    { label: "minute", seconds: 60 }, // 60 seconds
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const amount = Math.floor(diffInSeconds / unit.seconds);
    if (amount >= 1) {
      return `${amount} ${unit.label}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length; // Count words by splitting the string by spaces
  const readingTime = Math.ceil(words / wordsPerMinute); // Round up the reading time to the nearest minute

  return `${readingTime} min read`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Get the formatted parts of the date
  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

  // Extract day, month, and year from the formatted parts
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts
    .find((part) => part.type === "month")
    ?.value?.toLowerCase();
  const year = parts.find((part) => part.type === "year")?.value;

  // Return the custom formatted date
  return `${day}${month} ${year}`;
}
