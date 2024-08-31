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
