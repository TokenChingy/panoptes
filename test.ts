// Copyright 2019 Jason Zi Feng Lei. All rights reserved. MIT license.

// @ts-ignore
import { assert, runTests, test } from 'https://deno.land/x/testing/mod.ts';
// @ts-ignore
import { watch } from './mod.ts';

interface TestObjectStruct {
  a: String;
  b: {
    c: Array<String>;
  };
}

test(function getBasic(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... error ');
  });

  assert.equal(watchedObject.a, 'a');
});

test(function getDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... error ');
  });

  assert.equal(watchedObject.b.c[0], 'c');
});

test(function getBasicNotify(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(
    testObject,
    () => {
      console.log('... cb() ');
    },
    {
      callbackOnGet: true,
    },
  );

  assert.equal(watchedObject.a, 'a');
});

test(function getDeepNotify(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(
    testObject,
    () => {
      console.log('... cb() ');
    },
    {
      callbackOnGet: true,
    },
  );

  assert.equal(watchedObject.b.c[0], 'c');
});

test(function setBasic(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.a = 'b';
  assert.equal(watchedObject.a, 'b');
});

test(function setDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.b.c[0] = 'd';
  assert.equal(watchedObject.b.c[0], 'd');
});

test(function deleteBasic(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  delete watchedObject.a;
  assert.equal(watchedObject.a, undefined);
});

test(function deleteDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  delete watchedObject.b.c;
  assert.equal(watchedObject.b.c, undefined);
});

test(function pushBasic(): void {
  const testArray: Array<String> = ['a'];

  const watchedObject: any = watch(testArray, () => {
    console.log('... cb() ');
  });

  watchedObject.push('b');
  assert.equal(watchedObject[1], 'b');
});

test(function popBasic(): void {
  const testArray: Array<String> = ['a'];

  const watchedObject: any = watch(testArray, () => {
    console.log('... cb() ');
  });

  watchedObject.pop();
  assert.equal(watchedObject.length, 0);
});

test(function unshiftBasic(): void {
  const testArray: Array<String> = ['a'];

  const watchedObject: any = watch(testArray, () => {
    console.log('... cb() ');
  });

  watchedObject.unshift('z');
  assert.equal(watchedObject[0], 'z');
});

test(function shiftBasic(): void {
  const testArray: Array<String> = ['a'];

  const watchedObject: any = watch(testArray, () => {
    console.log('... cb() ');
  });

  watchedObject.shift();
  assert.equal(watchedObject.length, 0);
});

test(function pushDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.b.c.push('b');
  assert.equal(watchedObject.b.c[1], 'b');
});

test(function popDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.b.c.pop();
  assert.equal(watchedObject.b.c.length, 0);
});

test(function unshiftDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.b.c.unshift('z');
  assert.equal(watchedObject.b.c[0], 'z');
});

test(function shiftDeep(): void {
  const testObject: TestObjectStruct = {
    a: 'a',
    b: {
      c: ['c'],
    },
  };

  const watchedObject: any = watch(testObject, () => {
    console.log('... cb() ');
  });

  watchedObject.b.c.shift();
  assert.equal(watchedObject.b.c.length, 0);
});

runTests();
