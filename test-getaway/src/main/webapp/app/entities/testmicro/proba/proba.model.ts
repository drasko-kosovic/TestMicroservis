export interface IProba {
  id?: number;
  ime?: string | null;
}

export class Proba implements IProba {
  constructor(public id?: number, public ime?: string | null) {}
}

export function getProbaIdentifier(proba: IProba): number | undefined {
  return proba.id;
}
