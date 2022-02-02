export interface CountsResult {
  data: Count[];
}

export interface CountResult {
  data: Count;
}

export interface Count {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  url: string;
  count: number;
}
