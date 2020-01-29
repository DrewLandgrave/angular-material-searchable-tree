
export interface Topic {
  value: string;
  label: string;
  children?: Topic[];
  data: [];
  expandable?: boolean;
  level?: number;
  title?: string;
}
