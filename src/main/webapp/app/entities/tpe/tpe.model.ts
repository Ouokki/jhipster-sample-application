export interface ITpe {
  id: number;
  imageTpe?: string | null;
  descriptif?: string | null;
}

export type NewTpe = Omit<ITpe, 'id'> & { id: null };
