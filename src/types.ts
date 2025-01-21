export interface NodeData {
  key: string;
  label: string;
  tag: string;
  URL: string;
  cluster: string;
  x: number;
  y: number;
}

export interface UserNode {
  content: string;
  created_at: string;
  id: string;
  label: string;
  lamport_id: string;
  pubkey: string | null;
  category: string;
}

export interface UserEdge {
  id: string;
  label: string;
  source: string;
  target: string;
  category: string;
}

// export interface NodeData {
//   id: string;
//   content: string;
//   created_at: string;
//   pubkey: string | null;
//   type: string;
//   x: number;
//   y: number;
// }

export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Tag {
  key: string;
  image: string;
}

export interface Edge {
  id: string;
  label: string;
  source: string;
  target: string;
  type: string;
}

export interface Dataset {
  nodes: UserNode[];
  edges: UserEdge[];
  // clusters: Cluster[];
  // tags: Tag[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
