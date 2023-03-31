import { Fighter } from "./Fighter";
import { config } from "./config";

export function isInsideHitBox(player: Fighter, enemy: Fighter): boolean {
  return (
    isWithinRange(player, enemy) &&
    notMovedPassedEnemey(player, enemy) &&
    isNotAboveEnemy(player, enemy)
  );
}

function isWithinRange(player: Fighter, enemy: Fighter): boolean {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x
  );
}

function notMovedPassedEnemey(player: Fighter, enemy: Fighter): boolean {
  return player.attackBox.position.x <= enemy.position.x + config.playerWidth;
}

function isNotAboveEnemy(player: Fighter, enemy: Fighter): boolean {
  return (
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + (config.playerHeight + enemy.image.height)
  );
}

export function playerMisses(player: Fighter, currentFrame: number): boolean {
  return player.isAttacking && player.currentFrame === currentFrame;
}
