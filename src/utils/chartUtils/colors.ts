export function getPlayerColor(index: number, totalPlayers: number): string {
  return `hsl(${(index * 360) / totalPlayers}, 70%, 50%)`;
}

export function getChartColors() {
  return {
    primary: '#3B82F6', // blue-500
    secondary: '#93C5FD', // blue-300
    background: '#F3F4F6', // gray-100
  };
}