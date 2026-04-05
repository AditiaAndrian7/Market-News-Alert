function formatDate(dateString) {
  const date = new Date(dateString);

  return (
    date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB"
  );
}

function getRelativeTime(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  const diffMin = Math.floor((now - past) / 60000);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} hari lalu`;
}

module.exports = { formatDate, getRelativeTime };
