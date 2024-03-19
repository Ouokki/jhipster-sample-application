export interface IFdo {
  id: number;
}

export type NewFdo = Omit<IFdo, 'id'> & { id: null };
