export class Range {
  public readonly min: number = 0;
  public readonly max: number = 0;
  public readonly start: number = 0;
  public readonly end: number = 0;

  constructor(range: Range) {
    Object.assign(this, range);
  }
}
