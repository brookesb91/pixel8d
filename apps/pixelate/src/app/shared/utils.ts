import { HttpParams } from '@angular/common/http';

export const roundDownTo = (n: number, m: number) => Math.floor(n / m) * m;

export const toHttpParams = (params) => {
  return Object.getOwnPropertyNames(params).reduce(
    (p, key) => p.set(key, params[key]),
    new HttpParams()
  );
};
