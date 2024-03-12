export interface IOption {
  id: number;
}

export type NewOption = Omit<IOption, 'id'> & { id: null };
