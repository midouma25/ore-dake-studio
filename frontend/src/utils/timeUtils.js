/**
 * Formats seconds into HH:MM:SS.mmm or MM:SS.mmm
 * @param {number} totalSeconds - Time in seconds (can include decimals)
 * @returns {string} Formatted timecode
 */
export const formatTimecode = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  const pad = (num, size = 2) => num.toString().padStart(size, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
};