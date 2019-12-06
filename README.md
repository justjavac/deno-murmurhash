# deno-murmurhash

[![tag](https://img.shields.io/github/release/justjavac/deno-murmurhash)](https://github.com/justjavac/deno-murmurhash/releases)
[![Build Status](https://github.com/justjavac/deno-murmurhash/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno-murmurhash/actions)
[![license](https://img.shields.io/github/license/justjavac/deno-murmurhash)](https://github.com/justjavac/deno-murmurhash/blob/master/LICENSE)
[![](https://img.shields.io/badge/deno-v0.25.0-green.svg)](https://github.com/denoland/deno)

> An incremental implementation of MurmurHash3 for JavaScript

This version works significantly faster than the non-incremental version if you
need to hash many small strings into a single hash,
since string concatenation (to build the single string to pass the non-incremental version)
is fairly costly.

In one case tested, using the incremental version was about 50% faster
than concatenating 5-10 strings and then hashing.

## Usage

```ts
import Murmurhash3 from "https://deno.land/x/murmurhash/mod.ts";

const hash = MurmurHash3('string');

// Incrementally add text
hash.hash('more strings');
hash.hash('even more strings');

// All calls can be chained if desired
hash.hash('and').hash('some').hash('more');

// Get a result
hash.result();
// returns 0xe4ccfe6b
```


## API

### MurmurHash3(key?: string, seed?: number)

Get a hash state object, optionally initialized with the given `key` and `seed`.
`seed` must be a positive integer if provided.

```ts
const hashState = new MurmurHash3();
```

### MurmurHash3.prototype.hash(key: string)

Incrementally add `key` to the hash.
This can be called as many times as you want for the hash state object,
including after a call to `result()`.

### MurmurHash3.prototype.result(): number

Get the result of the hash as a 32-bit positive integer.
This performs the tail and finalizer portions of the algorithm,
but does not store the result in the state object.

This means that it is perfectly safe to get results and then continue adding strings via `hash`.

```ts
// Do the whole string at once
new MurmurHash3('this is a test string').result();
// 0x70529328

// Do part of the string, get a result, then the other part
const m = MurmurHash3('this is a');
m.result();
// 0xbfc4f834
m.hash(' test string').result();
// 0x70529328 (same as above)
```

### MurmurHash3.prototype.reset(seed: number)

Reset the state object for reuse, optionally using the given `seed`
(defaultsto `0` like the constructor).

## Thanks

Heavily inspired by [garycourt/murmurhash-js](https://github.com/garycourt/murmurhash-js),
[kazuyukitanimura/murmurhash-js](https://github.com/kazuyukitanimura/murmurhash-js),
[jensyt/imurmurhash-js](https://github.com/jensyt/imurmurhash-js).
