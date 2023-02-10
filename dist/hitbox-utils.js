import { config } from "./config.js";
export function isInsideHitBox(player, enemy) {
  return (
    isWithinRange(player, enemy) &&
    notMovedPassedEnemey(player, enemy) &&
    isNotAboveEnemy(player, enemy)
  );
}
function isWithinRange(player, enemy) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x
  );
}
function notMovedPassedEnemey(player, enemy) {
  return player.attackBox.position.x <= enemy.position.x + config.playerWidth;
}
function isNotAboveEnemy(player, enemy) {
  return (
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <=
      enemy.position.y + (config.playerHeight + enemy.image.height)
  );
}
export function playerMisses(player, currentFrame) {
  return player.isAttacking && player.currentFrame === currentFrame;
}
