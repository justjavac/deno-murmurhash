import { assertEquals } from "https://deno.land/std@0.68.0/testing/asserts.ts";

import Murmurhash3 from "./mod.ts";

Deno.test({
  name: "murmurhash3",
  fn(): void {
    const murmurhash3 = new Murmurhash3("foo");
    assertEquals(murmurhash3.result(), 4138058784);
    murmurhash3.reset();
    murmurhash3.hash("foo");
    assertEquals(murmurhash3.result(), 4138058784);
    murmurhash3.hash(" bar");
    assertEquals(murmurhash3.result(), 171088983);
    const murmurhash3_1 = new Murmurhash3("foo bar");
    assertEquals(murmurhash3_1.result(), 171088983);
  },
});
