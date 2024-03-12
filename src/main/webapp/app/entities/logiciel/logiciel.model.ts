export interface ILogiciel {
  id: number;
  parDefault?: boolean | null;
}

export type NewLogiciel = Omit<ILogiciel, 'id'> & { id: null };
