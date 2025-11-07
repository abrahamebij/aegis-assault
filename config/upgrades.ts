export interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const allUpgrades: Upgrade[] = [
  {
    id: 'multiShot',
    name: 'Multi-Shot',
    description: 'Fire 3 projectiles at once for 15 seconds',
    icon: '1 46'
  },
  {
    id: 'piercing',
    name: 'Piercing Shots',
    description: 'Projectiles pierce through enemies',
    icon: '2 21'
  },
  {
    id: 'fireRate',
    name: 'Rapid Fire',
    description: 'Increase fire rate by 50%',
    icon: '3 33'
  },
  {
    id: 'damage',
    name: 'Power Shot',
    description: 'Deal 2x damage to enemies',
    icon: '4 25'
  },
  {
    id: 'health',
    name: 'Health Boost',
    description: 'Increase max health by 25',
    icon: '5 68'
  },
  {
    id: 'speed',
    name: 'Swift Movement',
    description: 'Projectiles move 30% faster',
    icon: '8 76'
  }
];