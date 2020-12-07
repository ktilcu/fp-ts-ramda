import { Lens } from 'monocle-ts';

function _path<S>(path: Array<any>, obj: S) {
  const fromProp = Lens.fromProp<S>();
  const lens = fromProp(path[0]);
  return path
    .slice(1)
    .reduce((acc, prop) => acc.compose(fromProp(prop)), lens)
    .get(obj);
}

/**
 * Same as [R.path](https://ramdajs.com/docs/#path)
 *
 * @since 0.1.4
 */
// curried
// export function path<
//   S extends object,
//   K1 extends keyof S,
//   K2 extends keyof S[K1],
//   K3 extends keyof S[K1][K2],
//   K4 extends keyof S[K1][K2][K3],
//   K5 extends keyof S[K1][K2][K3][K4]
// >(p: [K1, K2, K3, K4, K5]): (obj: S) => S[K1][K2][K3][K4][K5];
// export function path<
//   S extends object,
//   K1 extends keyof S,
//   K2 extends keyof S[K1],
//   K3 extends keyof S[K1][K2],
//   K4 extends keyof S[K1][K2][K3]
// >(p: [K1, K2, K3, K4]): (obj: S) => S[K1][K2][K3][K4];
// export function path<S extends object, K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]>(
//   p: [K1, K2, K3]
// ): (obj: S) => S[K1][K2][K3];
// export function path<S extends object, K1 extends keyof S, K2 extends keyof S[K1]>(p: [K1, K2]): (obj: S) => S[K1][K2];
export function path<S extends object, K1 extends keyof S>(p: [K1]): (obj: S) => S[K1];

// not curried
export function path<
  S extends object,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4]
>(p: [K1, K2, K3, K4, K5], obj: S): S[K1][K2][K3][K4][K5];

export function path<
  S extends object,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3]
>(p: [K1, K2, K3, K4], obj: S): S[K1][K2][K3][K4];
export function path<S extends object, K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]>(
  p: [K1, K2, K3],
  obj: S
): S[K1][K2][K3];
export function path<S extends object, K1 extends keyof S, K2 extends keyof S[K1]>(p: [K1, K2], obj: S): S[K1][K2];
export function path<S extends object, K1 extends keyof S>(p: [K1], obj: S): S[K1];
export function path<S extends object>(path: Array<any>, obj?: S): any | ((obj: S) => any) {
  return obj === undefined ? (obj2: S) => _path(path, obj2) : _path(path, obj);
}

interface IAddress {
  number: string;
  street: string;
  zip: number;
  state: string;
  city: string;
}

interface IUser {
  name: string;
  address: IAddress;
  friends: Array<IUser>;
}

const w: IUser = {
  address: { number: '15', street: 'southwind', zip: 33770, state: 'FL', city: 'belleair bluffs' },
  friends: [],
  name: 'jordyn tilman'
};

const x: IUser = {
  address: { number: '15', street: 'southwind', zip: 33770, state: 'FL', city: 'belleair bluffs' },
  friends: [w],
  name: 'kyle tilman'
};

path(['friends'])(x);
