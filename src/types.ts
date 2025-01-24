export interface NodeData {
  key: string;
  label: string;
  tag: string;
  URL: string;
  cluster: string;
  x: number;
  y: number;
}

export interface UserInvite {
  lamport_id: string;
  uid: string;
  facets: {content: string,created_at: string,project_name: string};
}

export interface UserDetail {
  content: string;
  created_at: string;
  eth_address: string;
  event_type: string[];
  invite: UserInvite[];
  lamport_id: string;
  participates_in: {project_name: string, uid: string}[];
  pubkey: string;
  twitter_id: string;
}

export interface UserNode {
  category: string;
  detail: any;
  label: string;
  uid: string;
}

export interface UserEdge {
  uid: string;
  source: string;
  target: string;
}

export interface ProjectNode {
  category: string;
  content: string;
  created_at: string;
  detail: ProjectDetail;
  label: string;
  uid: string;
}

export interface ProjectDetail {
  event_count: number;
  event_type: string[];
  records_count: number;
  participates_in?: {lamport_id: string, uid: string}[];
  user_count: number;

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
  nodes: UserNode[] | ProjectNode[];
  edges: UserEdge[];
  // clusters: Cluster[];
  // tags: Tag[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
