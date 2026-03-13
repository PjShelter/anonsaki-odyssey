import type { SaveData, ShopItem } from '../types';

export class ShopService {
  purchase(item: ShopItem, saveData: SaveData): boolean {
    if (saveData.progression.gold < item.price) return false;

    if (item.once && saveData.progression.unlockedWeapons.includes(item.targetId)) {
      return false;
    }

    if (!this.checkRequirements(item, saveData)) return false;

    saveData.progression.gold -= item.price;

    if (item.category === 'weapon') {
      saveData.progression.unlockedWeapons.push(item.targetId);
    }

    return true;
  }

  private checkRequirements(item: ShopItem, saveData: SaveData): boolean {
    return item.requirements.every(req => {
      if (req.type === 'storyFlag' && req.flag) {
        return saveData.story.flags[req.flag] === true;
      }
      return true;
    });
  }
}
