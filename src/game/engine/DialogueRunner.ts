import type { Story, StoryNode } from '../types';

export class DialogueRunner {
  private story: Story | null = null;
  private currentIndex = 0;
  private flags: Record<string, boolean> = {};

  load(story: Story, flags: Record<string, boolean> = {}) {
    this.story = story;
    this.currentIndex = 0;
    this.flags = flags;
  }

  getCurrentNode(): StoryNode | null {
    if (!this.story || this.currentIndex >= this.story.nodes.length) {
      return null;
    }
    return this.story.nodes[this.currentIndex];
  }

  next() {
    this.currentIndex++;
  }

  jump(target: string) {
    if (!this.story) return;
    const index = this.story.nodes.findIndex((n: any) => n.id === target);
    if (index >= 0) this.currentIndex = index;
  }

  setFlag(flag: string, value: boolean) {
    this.flags[flag] = value;
  }

  getFlag(flag: string): boolean {
    return this.flags[flag] || false;
  }

  isComplete(): boolean {
    return !this.story || this.currentIndex >= this.story.nodes.length;
  }
}
