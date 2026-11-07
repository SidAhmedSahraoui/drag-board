export type ItemType = {
  id: string;
  title: string;
};

export type ContainerType = {
  id: string;
  title: string;
  items: ItemType[];
};

export type DragKind = "container" | "item";
