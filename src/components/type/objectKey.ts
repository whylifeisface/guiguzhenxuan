// type objectKey<T> = T extends object
//   ? (keyof T)[]
//   : T extends number
//   ? []
//   : T extends Array<any> | string
//   ? string[]
//   : never;
// interface ObjectConstructor {
//   keys<T>(o: T): objectKey<T>;
// }
