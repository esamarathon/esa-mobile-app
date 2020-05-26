const regEx = new RegExp('\\(([^)]+)\\)');

export function formatPlayers(players: string[]) {
  return players
    .map((player) => {
      const firstText = player.replace('[', '');
      const secondText = firstText.replace(']', '');
      const thirdText = secondText.replace(regEx, '');
      return thirdText;
    })
    .join(' vs. ');
}
