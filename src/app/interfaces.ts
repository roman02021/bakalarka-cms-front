const TYPES = ['string', 'integer', 'decimal', 'relation', 'file'] as const;
const RELATIONS = ['oneToOne', 'oneToMany', 'manyToOne', 'manyToMany'] as const;

export interface Attribute {
  id: number;
  displayName: string;
  name: string;
  referencedColumn?: string;
  referencedTable?: string;
  relationType?: (typeof RELATIONS)[number];
  type: (typeof TYPES)[number];
}
export interface Schema {
  displayName: string;
  name: string;
  attributes: Attribute[];
}
export interface Item {
  id: number;
  [key: string]: unknown;
}
