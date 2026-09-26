
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordHistory
 * 
 */
export type PasswordHistory = $Result.DefaultSelection<Prisma.$PasswordHistoryPayload>
/**
 * Model PasswordResetRequest
 * 
 */
export type PasswordResetRequest = $Result.DefaultSelection<Prisma.$PasswordResetRequestPayload>
/**
 * Model AuthActivityLog
 * 
 */
export type AuthActivityLog = $Result.DefaultSelection<Prisma.$AuthActivityLogPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StakeholderType: {
  EMPLOYEE: 'EMPLOYEE',
  CLIENT: 'CLIENT',
  VENDOR: 'VENDOR',
  PARTNER: 'PARTNER'
};

export type StakeholderType = (typeof StakeholderType)[keyof typeof StakeholderType]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  SUSPENDED: 'SUSPENDED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const ResetRequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ResetRequestStatus = (typeof ResetRequestStatus)[keyof typeof ResetRequestStatus]


export const AuthActivityType: {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  RESET_REQUESTED: 'RESET_REQUESTED',
  RESET_APPROVED: 'RESET_APPROVED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED'
};

export type AuthActivityType = (typeof AuthActivityType)[keyof typeof AuthActivityType]

}

export type StakeholderType = $Enums.StakeholderType

export const StakeholderType: typeof $Enums.StakeholderType

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type ResetRequestStatus = $Enums.ResetRequestStatus

export const ResetRequestStatus: typeof $Enums.ResetRequestStatus

export type AuthActivityType = $Enums.AuthActivityType

export const AuthActivityType: typeof $Enums.AuthActivityType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.passwordHistory`: Exposes CRUD operations for the **PasswordHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordHistories
    * const passwordHistories = await prisma.passwordHistory.findMany()
    * ```
    */
  get passwordHistory(): Prisma.PasswordHistoryDelegate<ExtArgs>;

  /**
   * `prisma.passwordResetRequest`: Exposes CRUD operations for the **PasswordResetRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetRequests
    * const passwordResetRequests = await prisma.passwordResetRequest.findMany()
    * ```
    */
  get passwordResetRequest(): Prisma.PasswordResetRequestDelegate<ExtArgs>;

  /**
   * `prisma.authActivityLog`: Exposes CRUD operations for the **AuthActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthActivityLogs
    * const authActivityLogs = await prisma.authActivityLog.findMany()
    * ```
    */
  get authActivityLog(): Prisma.AuthActivityLogDelegate<ExtArgs>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    PasswordHistory: 'PasswordHistory',
    PasswordResetRequest: 'PasswordResetRequest',
    AuthActivityLog: 'AuthActivityLog',
    OutboxEvent: 'OutboxEvent',
    Profile: 'Profile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "passwordHistory" | "passwordResetRequest" | "authActivityLog" | "outboxEvent" | "profile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordHistory: {
        payload: Prisma.$PasswordHistoryPayload<ExtArgs>
        fields: Prisma.PasswordHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          findFirst: {
            args: Prisma.PasswordHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          findMany: {
            args: Prisma.PasswordHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[]
          }
          create: {
            args: Prisma.PasswordHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          createMany: {
            args: Prisma.PasswordHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[]
          }
          delete: {
            args: Prisma.PasswordHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          update: {
            args: Prisma.PasswordHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PasswordHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          aggregate: {
            args: Prisma.PasswordHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordHistory>
          }
          groupBy: {
            args: Prisma.PasswordHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordHistoryCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetRequest: {
        payload: Prisma.$PasswordResetRequestPayload<ExtArgs>
        fields: Prisma.PasswordResetRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          findMany: {
            args: Prisma.PasswordResetRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>[]
          }
          create: {
            args: Prisma.PasswordResetRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          createMany: {
            args: Prisma.PasswordResetRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          update: {
            args: Prisma.PasswordResetRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetRequestPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetRequest>
          }
          groupBy: {
            args: Prisma.PasswordResetRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetRequestCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetRequestCountAggregateOutputType> | number
          }
        }
      }
      AuthActivityLog: {
        payload: Prisma.$AuthActivityLogPayload<ExtArgs>
        fields: Prisma.AuthActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          findFirst: {
            args: Prisma.AuthActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          findMany: {
            args: Prisma.AuthActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>[]
          }
          create: {
            args: Prisma.AuthActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          createMany: {
            args: Prisma.AuthActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>[]
          }
          delete: {
            args: Prisma.AuthActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          update: {
            args: Prisma.AuthActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.AuthActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthActivityLogPayload>
          }
          aggregate: {
            args: Prisma.AuthActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthActivityLog>
          }
          groupBy: {
            args: Prisma.AuthActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuthActivityLogCountAggregateOutputType> | number
          }
        }
      }
      OutboxEvent: {
        payload: Prisma.$OutboxEventPayload<ExtArgs>
        fields: Prisma.OutboxEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findFirst: {
            args: Prisma.OutboxEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findMany: {
            args: Prisma.OutboxEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          create: {
            args: Prisma.OutboxEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          createMany: {
            args: Prisma.OutboxEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          delete: {
            args: Prisma.OutboxEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          update: {
            args: Prisma.OutboxEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          deleteMany: {
            args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutboxEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          aggregate: {
            args: Prisma.OutboxEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboxEvent>
          }
          groupBy: {
            args: Prisma.OutboxEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxEventCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    passwordHistories: number
    resetRequests: number
    actionedResetRequests: number
    activityLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordHistories?: boolean | UserCountOutputTypeCountPasswordHistoriesArgs
    resetRequests?: boolean | UserCountOutputTypeCountResetRequestsArgs
    actionedResetRequests?: boolean | UserCountOutputTypeCountActionedResetRequestsArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResetRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionedResetRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthActivityLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    stakeholderType: $Enums.StakeholderType | null
    passwordHash: string | null
    status: $Enums.UserStatus | null
    mustChangePassword: boolean | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastPasswordChangeAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    stakeholderType: $Enums.StakeholderType | null
    passwordHash: string | null
    status: $Enums.UserStatus | null
    mustChangePassword: boolean | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastPasswordChangeAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    identifier: number
    stakeholderType: number
    passwordHash: number
    status: number
    mustChangePassword: number
    failedLoginAttempts: number
    lockedUntil: number
    lastLoginAt: number
    lastPasswordChangeAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserSumAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    identifier?: true
    stakeholderType?: true
    passwordHash?: true
    status?: true
    mustChangePassword?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastPasswordChangeAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    identifier?: true
    stakeholderType?: true
    passwordHash?: true
    status?: true
    mustChangePassword?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastPasswordChangeAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    identifier?: true
    stakeholderType?: true
    passwordHash?: true
    status?: true
    mustChangePassword?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastPasswordChangeAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    identifier: string
    stakeholderType: $Enums.StakeholderType
    passwordHash: string
    status: $Enums.UserStatus
    mustChangePassword: boolean
    failedLoginAttempts: number
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastPasswordChangeAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    stakeholderType?: boolean
    passwordHash?: boolean
    status?: boolean
    mustChangePassword?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastPasswordChangeAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordHistories?: boolean | User$passwordHistoriesArgs<ExtArgs>
    resetRequests?: boolean | User$resetRequestsArgs<ExtArgs>
    actionedResetRequests?: boolean | User$actionedResetRequestsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    stakeholderType?: boolean
    passwordHash?: boolean
    status?: boolean
    mustChangePassword?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastPasswordChangeAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    identifier?: boolean
    stakeholderType?: boolean
    passwordHash?: boolean
    status?: boolean
    mustChangePassword?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastPasswordChangeAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordHistories?: boolean | User$passwordHistoriesArgs<ExtArgs>
    resetRequests?: boolean | User$resetRequestsArgs<ExtArgs>
    actionedResetRequests?: boolean | User$actionedResetRequestsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      passwordHistories: Prisma.$PasswordHistoryPayload<ExtArgs>[]
      resetRequests: Prisma.$PasswordResetRequestPayload<ExtArgs>[]
      actionedResetRequests: Prisma.$PasswordResetRequestPayload<ExtArgs>[]
      activityLogs: Prisma.$AuthActivityLogPayload<ExtArgs>[]
      profile: Prisma.$ProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      stakeholderType: $Enums.StakeholderType
      passwordHash: string
      status: $Enums.UserStatus
      mustChangePassword: boolean
      failedLoginAttempts: number
      lockedUntil: Date | null
      lastLoginAt: Date | null
      lastPasswordChangeAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passwordHistories<T extends User$passwordHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    resetRequests<T extends User$resetRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$resetRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findMany"> | Null>
    actionedResetRequests<T extends User$actionedResetRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionedResetRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findMany"> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findMany"> | Null>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly identifier: FieldRef<"User", 'String'>
    readonly stakeholderType: FieldRef<"User", 'StakeholderType'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly mustChangePassword: FieldRef<"User", 'Boolean'>
    readonly failedLoginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly lastPasswordChangeAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.passwordHistories
   */
  export type User$passwordHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    where?: PasswordHistoryWhereInput
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    cursor?: PasswordHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * User.resetRequests
   */
  export type User$resetRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    where?: PasswordResetRequestWhereInput
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    cursor?: PasswordResetRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetRequestScalarFieldEnum | PasswordResetRequestScalarFieldEnum[]
  }

  /**
   * User.actionedResetRequests
   */
  export type User$actionedResetRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    where?: PasswordResetRequestWhereInput
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    cursor?: PasswordResetRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetRequestScalarFieldEnum | PasswordResetRequestScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    where?: AuthActivityLogWhereInput
    orderBy?: AuthActivityLogOrderByWithRelationInput | AuthActivityLogOrderByWithRelationInput[]
    cursor?: AuthActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthActivityLogScalarFieldEnum | AuthActivityLogScalarFieldEnum[]
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordHistory
   */

  export type AggregatePasswordHistory = {
    _count: PasswordHistoryCountAggregateOutputType | null
    _min: PasswordHistoryMinAggregateOutputType | null
    _max: PasswordHistoryMaxAggregateOutputType | null
  }

  export type PasswordHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type PasswordHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type PasswordHistoryCountAggregateOutputType = {
    id: number
    userId: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type PasswordHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    passwordHash?: true
    createdAt?: true
  }

  export type PasswordHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    passwordHash?: true
    createdAt?: true
  }

  export type PasswordHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    passwordHash?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordHistory to aggregate.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordHistories
    **/
    _count?: true | PasswordHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordHistoryMaxAggregateInputType
  }

  export type GetPasswordHistoryAggregateType<T extends PasswordHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordHistory[P]>
      : GetScalarType<T[P], AggregatePasswordHistory[P]>
  }




  export type PasswordHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordHistoryWhereInput
    orderBy?: PasswordHistoryOrderByWithAggregationInput | PasswordHistoryOrderByWithAggregationInput[]
    by: PasswordHistoryScalarFieldEnum[] | PasswordHistoryScalarFieldEnum
    having?: PasswordHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordHistoryCountAggregateInputType | true
    _min?: PasswordHistoryMinAggregateInputType
    _max?: PasswordHistoryMaxAggregateInputType
  }

  export type PasswordHistoryGroupByOutputType = {
    id: string
    userId: string
    passwordHash: string
    createdAt: Date
    _count: PasswordHistoryCountAggregateOutputType | null
    _min: PasswordHistoryMinAggregateOutputType | null
    _max: PasswordHistoryMaxAggregateOutputType | null
  }

  type GetPasswordHistoryGroupByPayload<T extends PasswordHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PasswordHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordHistory"]>

  export type PasswordHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordHistory"]>

  export type PasswordHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }

  export type PasswordHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      passwordHash: string
      createdAt: Date
    }, ExtArgs["result"]["passwordHistory"]>
    composites: {}
  }

  type PasswordHistoryGetPayload<S extends boolean | null | undefined | PasswordHistoryDefaultArgs> = $Result.GetResult<Prisma.$PasswordHistoryPayload, S>

  type PasswordHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PasswordHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PasswordHistoryCountAggregateInputType | true
    }

  export interface PasswordHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordHistory'], meta: { name: 'PasswordHistory' } }
    /**
     * Find zero or one PasswordHistory that matches the filter.
     * @param {PasswordHistoryFindUniqueArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordHistoryFindUniqueArgs>(args: SelectSubset<T, PasswordHistoryFindUniqueArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PasswordHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PasswordHistoryFindUniqueOrThrowArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PasswordHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindFirstArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordHistoryFindFirstArgs>(args?: SelectSubset<T, PasswordHistoryFindFirstArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PasswordHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindFirstOrThrowArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PasswordHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordHistories
     * const passwordHistories = await prisma.passwordHistory.findMany()
     * 
     * // Get first 10 PasswordHistories
     * const passwordHistories = await prisma.passwordHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordHistoryWithIdOnly = await prisma.passwordHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordHistoryFindManyArgs>(args?: SelectSubset<T, PasswordHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PasswordHistory.
     * @param {PasswordHistoryCreateArgs} args - Arguments to create a PasswordHistory.
     * @example
     * // Create one PasswordHistory
     * const PasswordHistory = await prisma.passwordHistory.create({
     *   data: {
     *     // ... data to create a PasswordHistory
     *   }
     * })
     * 
     */
    create<T extends PasswordHistoryCreateArgs>(args: SelectSubset<T, PasswordHistoryCreateArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PasswordHistories.
     * @param {PasswordHistoryCreateManyArgs} args - Arguments to create many PasswordHistories.
     * @example
     * // Create many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordHistoryCreateManyArgs>(args?: SelectSubset<T, PasswordHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordHistories and returns the data saved in the database.
     * @param {PasswordHistoryCreateManyAndReturnArgs} args - Arguments to create many PasswordHistories.
     * @example
     * // Create many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordHistories and only return the `id`
     * const passwordHistoryWithIdOnly = await prisma.passwordHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PasswordHistory.
     * @param {PasswordHistoryDeleteArgs} args - Arguments to delete one PasswordHistory.
     * @example
     * // Delete one PasswordHistory
     * const PasswordHistory = await prisma.passwordHistory.delete({
     *   where: {
     *     // ... filter to delete one PasswordHistory
     *   }
     * })
     * 
     */
    delete<T extends PasswordHistoryDeleteArgs>(args: SelectSubset<T, PasswordHistoryDeleteArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PasswordHistory.
     * @param {PasswordHistoryUpdateArgs} args - Arguments to update one PasswordHistory.
     * @example
     * // Update one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordHistoryUpdateArgs>(args: SelectSubset<T, PasswordHistoryUpdateArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PasswordHistories.
     * @param {PasswordHistoryDeleteManyArgs} args - Arguments to filter PasswordHistories to delete.
     * @example
     * // Delete a few PasswordHistories
     * const { count } = await prisma.passwordHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordHistoryDeleteManyArgs>(args?: SelectSubset<T, PasswordHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordHistoryUpdateManyArgs>(args: SelectSubset<T, PasswordHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordHistory.
     * @param {PasswordHistoryUpsertArgs} args - Arguments to update or create a PasswordHistory.
     * @example
     * // Update or create a PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.upsert({
     *   create: {
     *     // ... data to create a PasswordHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordHistory we want to update
     *   }
     * })
     */
    upsert<T extends PasswordHistoryUpsertArgs>(args: SelectSubset<T, PasswordHistoryUpsertArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PasswordHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryCountArgs} args - Arguments to filter PasswordHistories to count.
     * @example
     * // Count the number of PasswordHistories
     * const count = await prisma.passwordHistory.count({
     *   where: {
     *     // ... the filter for the PasswordHistories we want to count
     *   }
     * })
    **/
    count<T extends PasswordHistoryCountArgs>(
      args?: Subset<T, PasswordHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordHistoryAggregateArgs>(args: Subset<T, PasswordHistoryAggregateArgs>): Prisma.PrismaPromise<GetPasswordHistoryAggregateType<T>>

    /**
     * Group by PasswordHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PasswordHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordHistory model
   */
  readonly fields: PasswordHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordHistory model
   */ 
  interface PasswordHistoryFieldRefs {
    readonly id: FieldRef<"PasswordHistory", 'String'>
    readonly userId: FieldRef<"PasswordHistory", 'String'>
    readonly passwordHash: FieldRef<"PasswordHistory", 'String'>
    readonly createdAt: FieldRef<"PasswordHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordHistory findUnique
   */
  export type PasswordHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory findUniqueOrThrow
   */
  export type PasswordHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory findFirst
   */
  export type PasswordHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordHistories.
     */
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory findFirstOrThrow
   */
  export type PasswordHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordHistories.
     */
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory findMany
   */
  export type PasswordHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistories to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory create
   */
  export type PasswordHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordHistory.
     */
    data: XOR<PasswordHistoryCreateInput, PasswordHistoryUncheckedCreateInput>
  }

  /**
   * PasswordHistory createMany
   */
  export type PasswordHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordHistories.
     */
    data: PasswordHistoryCreateManyInput | PasswordHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordHistory createManyAndReturn
   */
  export type PasswordHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PasswordHistories.
     */
    data: PasswordHistoryCreateManyInput | PasswordHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordHistory update
   */
  export type PasswordHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordHistory.
     */
    data: XOR<PasswordHistoryUpdateInput, PasswordHistoryUncheckedUpdateInput>
    /**
     * Choose, which PasswordHistory to update.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory updateMany
   */
  export type PasswordHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordHistories.
     */
    data: XOR<PasswordHistoryUpdateManyMutationInput, PasswordHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PasswordHistories to update
     */
    where?: PasswordHistoryWhereInput
  }

  /**
   * PasswordHistory upsert
   */
  export type PasswordHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordHistory to update in case it exists.
     */
    where: PasswordHistoryWhereUniqueInput
    /**
     * In case the PasswordHistory found by the `where` argument doesn't exist, create a new PasswordHistory with this data.
     */
    create: XOR<PasswordHistoryCreateInput, PasswordHistoryUncheckedCreateInput>
    /**
     * In case the PasswordHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordHistoryUpdateInput, PasswordHistoryUncheckedUpdateInput>
  }

  /**
   * PasswordHistory delete
   */
  export type PasswordHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter which PasswordHistory to delete.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory deleteMany
   */
  export type PasswordHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordHistories to delete
     */
    where?: PasswordHistoryWhereInput
  }

  /**
   * PasswordHistory without action
   */
  export type PasswordHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetRequest
   */

  export type AggregatePasswordResetRequest = {
    _count: PasswordResetRequestCountAggregateOutputType | null
    _min: PasswordResetRequestMinAggregateOutputType | null
    _max: PasswordResetRequestMaxAggregateOutputType | null
  }

  export type PasswordResetRequestMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    userId: string | null
    reason: string | null
    status: $Enums.ResetRequestStatus | null
    actionedById: string | null
    actionNote: string | null
    tempPassword: string | null
    requestedAt: Date | null
    actionedAt: Date | null
  }

  export type PasswordResetRequestMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    userId: string | null
    reason: string | null
    status: $Enums.ResetRequestStatus | null
    actionedById: string | null
    actionNote: string | null
    tempPassword: string | null
    requestedAt: Date | null
    actionedAt: Date | null
  }

  export type PasswordResetRequestCountAggregateOutputType = {
    id: number
    identifier: number
    userId: number
    reason: number
    status: number
    actionedById: number
    actionNote: number
    tempPassword: number
    requestedAt: number
    actionedAt: number
    _all: number
  }


  export type PasswordResetRequestMinAggregateInputType = {
    id?: true
    identifier?: true
    userId?: true
    reason?: true
    status?: true
    actionedById?: true
    actionNote?: true
    tempPassword?: true
    requestedAt?: true
    actionedAt?: true
  }

  export type PasswordResetRequestMaxAggregateInputType = {
    id?: true
    identifier?: true
    userId?: true
    reason?: true
    status?: true
    actionedById?: true
    actionNote?: true
    tempPassword?: true
    requestedAt?: true
    actionedAt?: true
  }

  export type PasswordResetRequestCountAggregateInputType = {
    id?: true
    identifier?: true
    userId?: true
    reason?: true
    status?: true
    actionedById?: true
    actionNote?: true
    tempPassword?: true
    requestedAt?: true
    actionedAt?: true
    _all?: true
  }

  export type PasswordResetRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetRequest to aggregate.
     */
    where?: PasswordResetRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetRequests to fetch.
     */
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetRequests
    **/
    _count?: true | PasswordResetRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetRequestMaxAggregateInputType
  }

  export type GetPasswordResetRequestAggregateType<T extends PasswordResetRequestAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetRequest[P]>
      : GetScalarType<T[P], AggregatePasswordResetRequest[P]>
  }




  export type PasswordResetRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetRequestWhereInput
    orderBy?: PasswordResetRequestOrderByWithAggregationInput | PasswordResetRequestOrderByWithAggregationInput[]
    by: PasswordResetRequestScalarFieldEnum[] | PasswordResetRequestScalarFieldEnum
    having?: PasswordResetRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetRequestCountAggregateInputType | true
    _min?: PasswordResetRequestMinAggregateInputType
    _max?: PasswordResetRequestMaxAggregateInputType
  }

  export type PasswordResetRequestGroupByOutputType = {
    id: string
    identifier: string
    userId: string | null
    reason: string
    status: $Enums.ResetRequestStatus
    actionedById: string | null
    actionNote: string | null
    tempPassword: string | null
    requestedAt: Date
    actionedAt: Date | null
    _count: PasswordResetRequestCountAggregateOutputType | null
    _min: PasswordResetRequestMinAggregateOutputType | null
    _max: PasswordResetRequestMaxAggregateOutputType | null
  }

  type GetPasswordResetRequestGroupByPayload<T extends PasswordResetRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetRequestGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetRequestGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    userId?: boolean
    reason?: boolean
    status?: boolean
    actionedById?: boolean
    actionNote?: boolean
    tempPassword?: boolean
    requestedAt?: boolean
    actionedAt?: boolean
    user?: boolean | PasswordResetRequest$userArgs<ExtArgs>
    actionedBy?: boolean | PasswordResetRequest$actionedByArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetRequest"]>

  export type PasswordResetRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    userId?: boolean
    reason?: boolean
    status?: boolean
    actionedById?: boolean
    actionNote?: boolean
    tempPassword?: boolean
    requestedAt?: boolean
    actionedAt?: boolean
    user?: boolean | PasswordResetRequest$userArgs<ExtArgs>
    actionedBy?: boolean | PasswordResetRequest$actionedByArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetRequest"]>

  export type PasswordResetRequestSelectScalar = {
    id?: boolean
    identifier?: boolean
    userId?: boolean
    reason?: boolean
    status?: boolean
    actionedById?: boolean
    actionNote?: boolean
    tempPassword?: boolean
    requestedAt?: boolean
    actionedAt?: boolean
  }

  export type PasswordResetRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PasswordResetRequest$userArgs<ExtArgs>
    actionedBy?: boolean | PasswordResetRequest$actionedByArgs<ExtArgs>
  }
  export type PasswordResetRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PasswordResetRequest$userArgs<ExtArgs>
    actionedBy?: boolean | PasswordResetRequest$actionedByArgs<ExtArgs>
  }

  export type $PasswordResetRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      actionedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      userId: string | null
      reason: string
      status: $Enums.ResetRequestStatus
      actionedById: string | null
      actionNote: string | null
      tempPassword: string | null
      requestedAt: Date
      actionedAt: Date | null
    }, ExtArgs["result"]["passwordResetRequest"]>
    composites: {}
  }

  type PasswordResetRequestGetPayload<S extends boolean | null | undefined | PasswordResetRequestDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetRequestPayload, S>

  type PasswordResetRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PasswordResetRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PasswordResetRequestCountAggregateInputType | true
    }

  export interface PasswordResetRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetRequest'], meta: { name: 'PasswordResetRequest' } }
    /**
     * Find zero or one PasswordResetRequest that matches the filter.
     * @param {PasswordResetRequestFindUniqueArgs} args - Arguments to find a PasswordResetRequest
     * @example
     * // Get one PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetRequestFindUniqueArgs>(args: SelectSubset<T, PasswordResetRequestFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PasswordResetRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PasswordResetRequestFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetRequest
     * @example
     * // Get one PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PasswordResetRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestFindFirstArgs} args - Arguments to find a PasswordResetRequest
     * @example
     * // Get one PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetRequestFindFirstArgs>(args?: SelectSubset<T, PasswordResetRequestFindFirstArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PasswordResetRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestFindFirstOrThrowArgs} args - Arguments to find a PasswordResetRequest
     * @example
     * // Get one PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PasswordResetRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetRequests
     * const passwordResetRequests = await prisma.passwordResetRequest.findMany()
     * 
     * // Get first 10 PasswordResetRequests
     * const passwordResetRequests = await prisma.passwordResetRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetRequestWithIdOnly = await prisma.passwordResetRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetRequestFindManyArgs>(args?: SelectSubset<T, PasswordResetRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PasswordResetRequest.
     * @param {PasswordResetRequestCreateArgs} args - Arguments to create a PasswordResetRequest.
     * @example
     * // Create one PasswordResetRequest
     * const PasswordResetRequest = await prisma.passwordResetRequest.create({
     *   data: {
     *     // ... data to create a PasswordResetRequest
     *   }
     * })
     * 
     */
    create<T extends PasswordResetRequestCreateArgs>(args: SelectSubset<T, PasswordResetRequestCreateArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PasswordResetRequests.
     * @param {PasswordResetRequestCreateManyArgs} args - Arguments to create many PasswordResetRequests.
     * @example
     * // Create many PasswordResetRequests
     * const passwordResetRequest = await prisma.passwordResetRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetRequestCreateManyArgs>(args?: SelectSubset<T, PasswordResetRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetRequests and returns the data saved in the database.
     * @param {PasswordResetRequestCreateManyAndReturnArgs} args - Arguments to create many PasswordResetRequests.
     * @example
     * // Create many PasswordResetRequests
     * const passwordResetRequest = await prisma.passwordResetRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetRequests and only return the `id`
     * const passwordResetRequestWithIdOnly = await prisma.passwordResetRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PasswordResetRequest.
     * @param {PasswordResetRequestDeleteArgs} args - Arguments to delete one PasswordResetRequest.
     * @example
     * // Delete one PasswordResetRequest
     * const PasswordResetRequest = await prisma.passwordResetRequest.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetRequest
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetRequestDeleteArgs>(args: SelectSubset<T, PasswordResetRequestDeleteArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PasswordResetRequest.
     * @param {PasswordResetRequestUpdateArgs} args - Arguments to update one PasswordResetRequest.
     * @example
     * // Update one PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetRequestUpdateArgs>(args: SelectSubset<T, PasswordResetRequestUpdateArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PasswordResetRequests.
     * @param {PasswordResetRequestDeleteManyArgs} args - Arguments to filter PasswordResetRequests to delete.
     * @example
     * // Delete a few PasswordResetRequests
     * const { count } = await prisma.passwordResetRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetRequestDeleteManyArgs>(args?: SelectSubset<T, PasswordResetRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetRequests
     * const passwordResetRequest = await prisma.passwordResetRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetRequestUpdateManyArgs>(args: SelectSubset<T, PasswordResetRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetRequest.
     * @param {PasswordResetRequestUpsertArgs} args - Arguments to update or create a PasswordResetRequest.
     * @example
     * // Update or create a PasswordResetRequest
     * const passwordResetRequest = await prisma.passwordResetRequest.upsert({
     *   create: {
     *     // ... data to create a PasswordResetRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetRequest we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetRequestUpsertArgs>(args: SelectSubset<T, PasswordResetRequestUpsertArgs<ExtArgs>>): Prisma__PasswordResetRequestClient<$Result.GetResult<Prisma.$PasswordResetRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PasswordResetRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestCountArgs} args - Arguments to filter PasswordResetRequests to count.
     * @example
     * // Count the number of PasswordResetRequests
     * const count = await prisma.passwordResetRequest.count({
     *   where: {
     *     // ... the filter for the PasswordResetRequests we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetRequestCountArgs>(
      args?: Subset<T, PasswordResetRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetRequestAggregateArgs>(args: Subset<T, PasswordResetRequestAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetRequestAggregateType<T>>

    /**
     * Group by PasswordResetRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetRequestGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetRequest model
   */
  readonly fields: PasswordResetRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends PasswordResetRequest$userArgs<ExtArgs> = {}>(args?: Subset<T, PasswordResetRequest$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    actionedBy<T extends PasswordResetRequest$actionedByArgs<ExtArgs> = {}>(args?: Subset<T, PasswordResetRequest$actionedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetRequest model
   */ 
  interface PasswordResetRequestFieldRefs {
    readonly id: FieldRef<"PasswordResetRequest", 'String'>
    readonly identifier: FieldRef<"PasswordResetRequest", 'String'>
    readonly userId: FieldRef<"PasswordResetRequest", 'String'>
    readonly reason: FieldRef<"PasswordResetRequest", 'String'>
    readonly status: FieldRef<"PasswordResetRequest", 'ResetRequestStatus'>
    readonly actionedById: FieldRef<"PasswordResetRequest", 'String'>
    readonly actionNote: FieldRef<"PasswordResetRequest", 'String'>
    readonly tempPassword: FieldRef<"PasswordResetRequest", 'String'>
    readonly requestedAt: FieldRef<"PasswordResetRequest", 'DateTime'>
    readonly actionedAt: FieldRef<"PasswordResetRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetRequest findUnique
   */
  export type PasswordResetRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetRequest to fetch.
     */
    where: PasswordResetRequestWhereUniqueInput
  }

  /**
   * PasswordResetRequest findUniqueOrThrow
   */
  export type PasswordResetRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetRequest to fetch.
     */
    where: PasswordResetRequestWhereUniqueInput
  }

  /**
   * PasswordResetRequest findFirst
   */
  export type PasswordResetRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetRequest to fetch.
     */
    where?: PasswordResetRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetRequests to fetch.
     */
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetRequests.
     */
    cursor?: PasswordResetRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetRequests.
     */
    distinct?: PasswordResetRequestScalarFieldEnum | PasswordResetRequestScalarFieldEnum[]
  }

  /**
   * PasswordResetRequest findFirstOrThrow
   */
  export type PasswordResetRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetRequest to fetch.
     */
    where?: PasswordResetRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetRequests to fetch.
     */
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetRequests.
     */
    cursor?: PasswordResetRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetRequests.
     */
    distinct?: PasswordResetRequestScalarFieldEnum | PasswordResetRequestScalarFieldEnum[]
  }

  /**
   * PasswordResetRequest findMany
   */
  export type PasswordResetRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetRequests to fetch.
     */
    where?: PasswordResetRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetRequests to fetch.
     */
    orderBy?: PasswordResetRequestOrderByWithRelationInput | PasswordResetRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetRequests.
     */
    cursor?: PasswordResetRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetRequests.
     */
    skip?: number
    distinct?: PasswordResetRequestScalarFieldEnum | PasswordResetRequestScalarFieldEnum[]
  }

  /**
   * PasswordResetRequest create
   */
  export type PasswordResetRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetRequest.
     */
    data: XOR<PasswordResetRequestCreateInput, PasswordResetRequestUncheckedCreateInput>
  }

  /**
   * PasswordResetRequest createMany
   */
  export type PasswordResetRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetRequests.
     */
    data: PasswordResetRequestCreateManyInput | PasswordResetRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetRequest createManyAndReturn
   */
  export type PasswordResetRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PasswordResetRequests.
     */
    data: PasswordResetRequestCreateManyInput | PasswordResetRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetRequest update
   */
  export type PasswordResetRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetRequest.
     */
    data: XOR<PasswordResetRequestUpdateInput, PasswordResetRequestUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetRequest to update.
     */
    where: PasswordResetRequestWhereUniqueInput
  }

  /**
   * PasswordResetRequest updateMany
   */
  export type PasswordResetRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetRequests.
     */
    data: XOR<PasswordResetRequestUpdateManyMutationInput, PasswordResetRequestUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetRequests to update
     */
    where?: PasswordResetRequestWhereInput
  }

  /**
   * PasswordResetRequest upsert
   */
  export type PasswordResetRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetRequest to update in case it exists.
     */
    where: PasswordResetRequestWhereUniqueInput
    /**
     * In case the PasswordResetRequest found by the `where` argument doesn't exist, create a new PasswordResetRequest with this data.
     */
    create: XOR<PasswordResetRequestCreateInput, PasswordResetRequestUncheckedCreateInput>
    /**
     * In case the PasswordResetRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetRequestUpdateInput, PasswordResetRequestUncheckedUpdateInput>
  }

  /**
   * PasswordResetRequest delete
   */
  export type PasswordResetRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetRequest to delete.
     */
    where: PasswordResetRequestWhereUniqueInput
  }

  /**
   * PasswordResetRequest deleteMany
   */
  export type PasswordResetRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetRequests to delete
     */
    where?: PasswordResetRequestWhereInput
  }

  /**
   * PasswordResetRequest.user
   */
  export type PasswordResetRequest$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PasswordResetRequest.actionedBy
   */
  export type PasswordResetRequest$actionedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PasswordResetRequest without action
   */
  export type PasswordResetRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetRequest
     */
    select?: PasswordResetRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetRequestInclude<ExtArgs> | null
  }


  /**
   * Model AuthActivityLog
   */

  export type AggregateAuthActivityLog = {
    _count: AuthActivityLogCountAggregateOutputType | null
    _min: AuthActivityLogMinAggregateOutputType | null
    _max: AuthActivityLogMaxAggregateOutputType | null
  }

  export type AuthActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    identifier: string | null
    action: $Enums.AuthActivityType | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuthActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    identifier: string | null
    action: $Enums.AuthActivityType | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuthActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    identifier: number
    action: number
    ipAddress: number
    userAgent: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuthActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    identifier?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuthActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    identifier?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuthActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    identifier?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuthActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthActivityLog to aggregate.
     */
    where?: AuthActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthActivityLogs to fetch.
     */
    orderBy?: AuthActivityLogOrderByWithRelationInput | AuthActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthActivityLogs
    **/
    _count?: true | AuthActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthActivityLogMaxAggregateInputType
  }

  export type GetAuthActivityLogAggregateType<T extends AuthActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthActivityLog[P]>
      : GetScalarType<T[P], AggregateAuthActivityLog[P]>
  }




  export type AuthActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthActivityLogWhereInput
    orderBy?: AuthActivityLogOrderByWithAggregationInput | AuthActivityLogOrderByWithAggregationInput[]
    by: AuthActivityLogScalarFieldEnum[] | AuthActivityLogScalarFieldEnum
    having?: AuthActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthActivityLogCountAggregateInputType | true
    _min?: AuthActivityLogMinAggregateInputType
    _max?: AuthActivityLogMaxAggregateInputType
  }

  export type AuthActivityLogGroupByOutputType = {
    id: string
    userId: string | null
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: AuthActivityLogCountAggregateOutputType | null
    _min: AuthActivityLogMinAggregateOutputType | null
    _max: AuthActivityLogMaxAggregateOutputType | null
  }

  type GetAuthActivityLogGroupByPayload<T extends AuthActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuthActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type AuthActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    identifier?: boolean
    action?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | AuthActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authActivityLog"]>

  export type AuthActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    identifier?: boolean
    action?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | AuthActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authActivityLog"]>

  export type AuthActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    identifier?: boolean
    action?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuthActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthActivityLog$userArgs<ExtArgs>
  }
  export type AuthActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthActivityLog$userArgs<ExtArgs>
  }

  export type $AuthActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      identifier: string
      action: $Enums.AuthActivityType
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["authActivityLog"]>
    composites: {}
  }

  type AuthActivityLogGetPayload<S extends boolean | null | undefined | AuthActivityLogDefaultArgs> = $Result.GetResult<Prisma.$AuthActivityLogPayload, S>

  type AuthActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuthActivityLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuthActivityLogCountAggregateInputType | true
    }

  export interface AuthActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthActivityLog'], meta: { name: 'AuthActivityLog' } }
    /**
     * Find zero or one AuthActivityLog that matches the filter.
     * @param {AuthActivityLogFindUniqueArgs} args - Arguments to find a AuthActivityLog
     * @example
     * // Get one AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthActivityLogFindUniqueArgs>(args: SelectSubset<T, AuthActivityLogFindUniqueArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuthActivityLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuthActivityLogFindUniqueOrThrowArgs} args - Arguments to find a AuthActivityLog
     * @example
     * // Get one AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuthActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogFindFirstArgs} args - Arguments to find a AuthActivityLog
     * @example
     * // Get one AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthActivityLogFindFirstArgs>(args?: SelectSubset<T, AuthActivityLogFindFirstArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuthActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogFindFirstOrThrowArgs} args - Arguments to find a AuthActivityLog
     * @example
     * // Get one AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuthActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthActivityLogs
     * const authActivityLogs = await prisma.authActivityLog.findMany()
     * 
     * // Get first 10 AuthActivityLogs
     * const authActivityLogs = await prisma.authActivityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authActivityLogWithIdOnly = await prisma.authActivityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthActivityLogFindManyArgs>(args?: SelectSubset<T, AuthActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuthActivityLog.
     * @param {AuthActivityLogCreateArgs} args - Arguments to create a AuthActivityLog.
     * @example
     * // Create one AuthActivityLog
     * const AuthActivityLog = await prisma.authActivityLog.create({
     *   data: {
     *     // ... data to create a AuthActivityLog
     *   }
     * })
     * 
     */
    create<T extends AuthActivityLogCreateArgs>(args: SelectSubset<T, AuthActivityLogCreateArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuthActivityLogs.
     * @param {AuthActivityLogCreateManyArgs} args - Arguments to create many AuthActivityLogs.
     * @example
     * // Create many AuthActivityLogs
     * const authActivityLog = await prisma.authActivityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthActivityLogCreateManyArgs>(args?: SelectSubset<T, AuthActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthActivityLogs and returns the data saved in the database.
     * @param {AuthActivityLogCreateManyAndReturnArgs} args - Arguments to create many AuthActivityLogs.
     * @example
     * // Create many AuthActivityLogs
     * const authActivityLog = await prisma.authActivityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthActivityLogs and only return the `id`
     * const authActivityLogWithIdOnly = await prisma.authActivityLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuthActivityLog.
     * @param {AuthActivityLogDeleteArgs} args - Arguments to delete one AuthActivityLog.
     * @example
     * // Delete one AuthActivityLog
     * const AuthActivityLog = await prisma.authActivityLog.delete({
     *   where: {
     *     // ... filter to delete one AuthActivityLog
     *   }
     * })
     * 
     */
    delete<T extends AuthActivityLogDeleteArgs>(args: SelectSubset<T, AuthActivityLogDeleteArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuthActivityLog.
     * @param {AuthActivityLogUpdateArgs} args - Arguments to update one AuthActivityLog.
     * @example
     * // Update one AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthActivityLogUpdateArgs>(args: SelectSubset<T, AuthActivityLogUpdateArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuthActivityLogs.
     * @param {AuthActivityLogDeleteManyArgs} args - Arguments to filter AuthActivityLogs to delete.
     * @example
     * // Delete a few AuthActivityLogs
     * const { count } = await prisma.authActivityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthActivityLogDeleteManyArgs>(args?: SelectSubset<T, AuthActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthActivityLogs
     * const authActivityLog = await prisma.authActivityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthActivityLogUpdateManyArgs>(args: SelectSubset<T, AuthActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthActivityLog.
     * @param {AuthActivityLogUpsertArgs} args - Arguments to update or create a AuthActivityLog.
     * @example
     * // Update or create a AuthActivityLog
     * const authActivityLog = await prisma.authActivityLog.upsert({
     *   create: {
     *     // ... data to create a AuthActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends AuthActivityLogUpsertArgs>(args: SelectSubset<T, AuthActivityLogUpsertArgs<ExtArgs>>): Prisma__AuthActivityLogClient<$Result.GetResult<Prisma.$AuthActivityLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuthActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogCountArgs} args - Arguments to filter AuthActivityLogs to count.
     * @example
     * // Count the number of AuthActivityLogs
     * const count = await prisma.authActivityLog.count({
     *   where: {
     *     // ... the filter for the AuthActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends AuthActivityLogCountArgs>(
      args?: Subset<T, AuthActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthActivityLogAggregateArgs>(args: Subset<T, AuthActivityLogAggregateArgs>): Prisma.PrismaPromise<GetAuthActivityLogAggregateType<T>>

    /**
     * Group by AuthActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: AuthActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthActivityLog model
   */
  readonly fields: AuthActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuthActivityLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuthActivityLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthActivityLog model
   */ 
  interface AuthActivityLogFieldRefs {
    readonly id: FieldRef<"AuthActivityLog", 'String'>
    readonly userId: FieldRef<"AuthActivityLog", 'String'>
    readonly identifier: FieldRef<"AuthActivityLog", 'String'>
    readonly action: FieldRef<"AuthActivityLog", 'AuthActivityType'>
    readonly ipAddress: FieldRef<"AuthActivityLog", 'String'>
    readonly userAgent: FieldRef<"AuthActivityLog", 'String'>
    readonly metadata: FieldRef<"AuthActivityLog", 'Json'>
    readonly createdAt: FieldRef<"AuthActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthActivityLog findUnique
   */
  export type AuthActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthActivityLog to fetch.
     */
    where: AuthActivityLogWhereUniqueInput
  }

  /**
   * AuthActivityLog findUniqueOrThrow
   */
  export type AuthActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthActivityLog to fetch.
     */
    where: AuthActivityLogWhereUniqueInput
  }

  /**
   * AuthActivityLog findFirst
   */
  export type AuthActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthActivityLog to fetch.
     */
    where?: AuthActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthActivityLogs to fetch.
     */
    orderBy?: AuthActivityLogOrderByWithRelationInput | AuthActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthActivityLogs.
     */
    cursor?: AuthActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthActivityLogs.
     */
    distinct?: AuthActivityLogScalarFieldEnum | AuthActivityLogScalarFieldEnum[]
  }

  /**
   * AuthActivityLog findFirstOrThrow
   */
  export type AuthActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthActivityLog to fetch.
     */
    where?: AuthActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthActivityLogs to fetch.
     */
    orderBy?: AuthActivityLogOrderByWithRelationInput | AuthActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthActivityLogs.
     */
    cursor?: AuthActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthActivityLogs.
     */
    distinct?: AuthActivityLogScalarFieldEnum | AuthActivityLogScalarFieldEnum[]
  }

  /**
   * AuthActivityLog findMany
   */
  export type AuthActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthActivityLogs to fetch.
     */
    where?: AuthActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthActivityLogs to fetch.
     */
    orderBy?: AuthActivityLogOrderByWithRelationInput | AuthActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthActivityLogs.
     */
    cursor?: AuthActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthActivityLogs.
     */
    skip?: number
    distinct?: AuthActivityLogScalarFieldEnum | AuthActivityLogScalarFieldEnum[]
  }

  /**
   * AuthActivityLog create
   */
  export type AuthActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthActivityLog.
     */
    data: XOR<AuthActivityLogCreateInput, AuthActivityLogUncheckedCreateInput>
  }

  /**
   * AuthActivityLog createMany
   */
  export type AuthActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthActivityLogs.
     */
    data: AuthActivityLogCreateManyInput | AuthActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthActivityLog createManyAndReturn
   */
  export type AuthActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuthActivityLogs.
     */
    data: AuthActivityLogCreateManyInput | AuthActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthActivityLog update
   */
  export type AuthActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthActivityLog.
     */
    data: XOR<AuthActivityLogUpdateInput, AuthActivityLogUncheckedUpdateInput>
    /**
     * Choose, which AuthActivityLog to update.
     */
    where: AuthActivityLogWhereUniqueInput
  }

  /**
   * AuthActivityLog updateMany
   */
  export type AuthActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthActivityLogs.
     */
    data: XOR<AuthActivityLogUpdateManyMutationInput, AuthActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which AuthActivityLogs to update
     */
    where?: AuthActivityLogWhereInput
  }

  /**
   * AuthActivityLog upsert
   */
  export type AuthActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthActivityLog to update in case it exists.
     */
    where: AuthActivityLogWhereUniqueInput
    /**
     * In case the AuthActivityLog found by the `where` argument doesn't exist, create a new AuthActivityLog with this data.
     */
    create: XOR<AuthActivityLogCreateInput, AuthActivityLogUncheckedCreateInput>
    /**
     * In case the AuthActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthActivityLogUpdateInput, AuthActivityLogUncheckedUpdateInput>
  }

  /**
   * AuthActivityLog delete
   */
  export type AuthActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
    /**
     * Filter which AuthActivityLog to delete.
     */
    where: AuthActivityLogWhereUniqueInput
  }

  /**
   * AuthActivityLog deleteMany
   */
  export type AuthActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthActivityLogs to delete
     */
    where?: AuthActivityLogWhereInput
  }

  /**
   * AuthActivityLog.user
   */
  export type AuthActivityLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuthActivityLog without action
   */
  export type AuthActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthActivityLog
     */
    select?: AuthActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model OutboxEvent
   */

  export type AggregateOutboxEvent = {
    _count: OutboxEventCountAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  export type OutboxEventMinAggregateOutputType = {
    id: string | null
    eventType: string | null
    aggregateType: string | null
    aggregateId: string | null
    processed: boolean | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    eventType: string | null
    aggregateType: string | null
    aggregateId: string | null
    processed: boolean | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    eventType: number
    aggregateType: number
    aggregateId: number
    payload: number
    processed: number
    processedAt: number
    createdAt: number
    _all: number
  }


  export type OutboxEventMinAggregateInputType = {
    id?: true
    eventType?: true
    aggregateType?: true
    aggregateId?: true
    processed?: true
    processedAt?: true
    createdAt?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    eventType?: true
    aggregateType?: true
    aggregateId?: true
    processed?: true
    processedAt?: true
    createdAt?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    eventType?: true
    aggregateType?: true
    aggregateId?: true
    payload?: true
    processed?: true
    processedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OutboxEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvent to aggregate.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboxEvents
    **/
    _count?: true | OutboxEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxEventMaxAggregateInputType
  }

  export type GetOutboxEventAggregateType<T extends OutboxEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboxEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxEvent[P]>
      : GetScalarType<T[P], AggregateOutboxEvent[P]>
  }




  export type OutboxEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxEventWhereInput
    orderBy?: OutboxEventOrderByWithAggregationInput | OutboxEventOrderByWithAggregationInput[]
    by: OutboxEventScalarFieldEnum[] | OutboxEventScalarFieldEnum
    having?: OutboxEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxEventCountAggregateInputType | true
    _min?: OutboxEventMinAggregateInputType
    _max?: OutboxEventMaxAggregateInputType
  }

  export type OutboxEventGroupByOutputType = {
    id: string
    eventType: string
    aggregateType: string
    aggregateId: string
    payload: JsonValue
    processed: boolean
    processedAt: Date | null
    createdAt: Date
    _count: OutboxEventCountAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  type GetOutboxEventGroupByPayload<T extends OutboxEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
        }
      >
    >


  export type OutboxEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    payload?: boolean
    processed?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    payload?: boolean
    processed?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    eventType?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    payload?: boolean
    processed?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }


  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventType: string
      aggregateType: string
      aggregateId: string
      payload: Prisma.JsonValue
      processed: boolean
      processedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["outboxEvent"]>
    composites: {}
  }

  type OutboxEventGetPayload<S extends boolean | null | undefined | OutboxEventDefaultArgs> = $Result.GetResult<Prisma.$OutboxEventPayload, S>

  type OutboxEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OutboxEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OutboxEventCountAggregateInputType | true
    }

  export interface OutboxEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboxEvent'], meta: { name: 'OutboxEvent' } }
    /**
     * Find zero or one OutboxEvent that matches the filter.
     * @param {OutboxEventFindUniqueArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxEventFindUniqueArgs>(args: SelectSubset<T, OutboxEventFindUniqueArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OutboxEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OutboxEventFindUniqueOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OutboxEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxEventFindFirstArgs>(args?: SelectSubset<T, OutboxEventFindFirstArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OutboxEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OutboxEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany()
     * 
     * // Get first 10 OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxEventFindManyArgs>(args?: SelectSubset<T, OutboxEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OutboxEvent.
     * @param {OutboxEventCreateArgs} args - Arguments to create a OutboxEvent.
     * @example
     * // Create one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.create({
     *   data: {
     *     // ... data to create a OutboxEvent
     *   }
     * })
     * 
     */
    create<T extends OutboxEventCreateArgs>(args: SelectSubset<T, OutboxEventCreateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OutboxEvents.
     * @param {OutboxEventCreateManyArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxEventCreateManyArgs>(args?: SelectSubset<T, OutboxEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboxEvents and returns the data saved in the database.
     * @param {OutboxEventCreateManyAndReturnArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OutboxEvent.
     * @param {OutboxEventDeleteArgs} args - Arguments to delete one OutboxEvent.
     * @example
     * // Delete one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.delete({
     *   where: {
     *     // ... filter to delete one OutboxEvent
     *   }
     * })
     * 
     */
    delete<T extends OutboxEventDeleteArgs>(args: SelectSubset<T, OutboxEventDeleteArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OutboxEvent.
     * @param {OutboxEventUpdateArgs} args - Arguments to update one OutboxEvent.
     * @example
     * // Update one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxEventUpdateArgs>(args: SelectSubset<T, OutboxEventUpdateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OutboxEvents.
     * @param {OutboxEventDeleteManyArgs} args - Arguments to filter OutboxEvents to delete.
     * @example
     * // Delete a few OutboxEvents
     * const { count } = await prisma.outboxEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxEventDeleteManyArgs>(args?: SelectSubset<T, OutboxEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxEventUpdateManyArgs>(args: SelectSubset<T, OutboxEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OutboxEvent.
     * @param {OutboxEventUpsertArgs} args - Arguments to update or create a OutboxEvent.
     * @example
     * // Update or create a OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.upsert({
     *   create: {
     *     // ... data to create a OutboxEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxEvent we want to update
     *   }
     * })
     */
    upsert<T extends OutboxEventUpsertArgs>(args: SelectSubset<T, OutboxEventUpsertArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventCountArgs} args - Arguments to filter OutboxEvents to count.
     * @example
     * // Count the number of OutboxEvents
     * const count = await prisma.outboxEvent.count({
     *   where: {
     *     // ... the filter for the OutboxEvents we want to count
     *   }
     * })
    **/
    count<T extends OutboxEventCountArgs>(
      args?: Subset<T, OutboxEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboxEventAggregateArgs>(args: Subset<T, OutboxEventAggregateArgs>): Prisma.PrismaPromise<GetOutboxEventAggregateType<T>>

    /**
     * Group by OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboxEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxEventGroupByArgs['orderBy'] }
        : { orderBy?: OutboxEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboxEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboxEvent model
   */
  readonly fields: OutboxEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutboxEvent model
   */ 
  interface OutboxEventFieldRefs {
    readonly id: FieldRef<"OutboxEvent", 'String'>
    readonly eventType: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateType: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateId: FieldRef<"OutboxEvent", 'String'>
    readonly payload: FieldRef<"OutboxEvent", 'Json'>
    readonly processed: FieldRef<"OutboxEvent", 'Boolean'>
    readonly processedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly createdAt: FieldRef<"OutboxEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OutboxEvent findUnique
   */
  export type OutboxEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findUniqueOrThrow
   */
  export type OutboxEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findFirst
   */
  export type OutboxEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findFirstOrThrow
   */
  export type OutboxEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findMany
   */
  export type OutboxEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter, which OutboxEvents to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent create
   */
  export type OutboxEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * The data needed to create a OutboxEvent.
     */
    data: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
  }

  /**
   * OutboxEvent createMany
   */
  export type OutboxEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent createManyAndReturn
   */
  export type OutboxEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent update
   */
  export type OutboxEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * The data needed to update a OutboxEvent.
     */
    data: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
    /**
     * Choose, which OutboxEvent to update.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent updateMany
   */
  export type OutboxEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
  }

  /**
   * OutboxEvent upsert
   */
  export type OutboxEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * The filter to search for the OutboxEvent to update in case it exists.
     */
    where: OutboxEventWhereUniqueInput
    /**
     * In case the OutboxEvent found by the `where` argument doesn't exist, create a new OutboxEvent with this data.
     */
    create: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
    /**
     * In case the OutboxEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
  }

  /**
   * OutboxEvent delete
   */
  export type OutboxEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Filter which OutboxEvent to delete.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent deleteMany
   */
  export type OutboxEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvents to delete
     */
    where?: OutboxEventWhereInput
  }

  /**
   * OutboxEvent without action
   */
  export type OutboxEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    email: number
    phone: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string | null
      lastName: string | null
      email: string | null
      phone: string | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    stakeholderType: 'stakeholderType',
    passwordHash: 'passwordHash',
    status: 'status',
    mustChangePassword: 'mustChangePassword',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    lastLoginAt: 'lastLoginAt',
    lastPasswordChangeAt: 'lastPasswordChangeAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type PasswordHistoryScalarFieldEnum = (typeof PasswordHistoryScalarFieldEnum)[keyof typeof PasswordHistoryScalarFieldEnum]


  export const PasswordResetRequestScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    userId: 'userId',
    reason: 'reason',
    status: 'status',
    actionedById: 'actionedById',
    actionNote: 'actionNote',
    tempPassword: 'tempPassword',
    requestedAt: 'requestedAt',
    actionedAt: 'actionedAt'
  };

  export type PasswordResetRequestScalarFieldEnum = (typeof PasswordResetRequestScalarFieldEnum)[keyof typeof PasswordResetRequestScalarFieldEnum]


  export const AuthActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    identifier: 'identifier',
    action: 'action',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuthActivityLogScalarFieldEnum = (typeof AuthActivityLogScalarFieldEnum)[keyof typeof AuthActivityLogScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    aggregateType: 'aggregateType',
    aggregateId: 'aggregateId',
    payload: 'payload',
    processed: 'processed',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'StakeholderType'
   */
  export type EnumStakeholderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StakeholderType'>
    


  /**
   * Reference to a field of type 'StakeholderType[]'
   */
  export type ListEnumStakeholderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StakeholderType[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ResetRequestStatus'
   */
  export type EnumResetRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResetRequestStatus'>
    


  /**
   * Reference to a field of type 'ResetRequestStatus[]'
   */
  export type ListEnumResetRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResetRequestStatus[]'>
    


  /**
   * Reference to a field of type 'AuthActivityType'
   */
  export type EnumAuthActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthActivityType'>
    


  /**
   * Reference to a field of type 'AuthActivityType[]'
   */
  export type ListEnumAuthActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthActivityType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    identifier?: StringFilter<"User"> | string
    stakeholderType?: EnumStakeholderTypeFilter<"User"> | $Enums.StakeholderType
    passwordHash?: StringFilter<"User"> | string
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    mustChangePassword?: BoolFilter<"User"> | boolean
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastPasswordChangeAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    passwordHistories?: PasswordHistoryListRelationFilter
    resetRequests?: PasswordResetRequestListRelationFilter
    actionedResetRequests?: PasswordResetRequestListRelationFilter
    activityLogs?: AuthActivityLogListRelationFilter
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    stakeholderType?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    mustChangePassword?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastPasswordChangeAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordHistories?: PasswordHistoryOrderByRelationAggregateInput
    resetRequests?: PasswordResetRequestOrderByRelationAggregateInput
    actionedResetRequests?: PasswordResetRequestOrderByRelationAggregateInput
    activityLogs?: AuthActivityLogOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    identifier?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    stakeholderType?: EnumStakeholderTypeFilter<"User"> | $Enums.StakeholderType
    passwordHash?: StringFilter<"User"> | string
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    mustChangePassword?: BoolFilter<"User"> | boolean
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastPasswordChangeAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    passwordHistories?: PasswordHistoryListRelationFilter
    resetRequests?: PasswordResetRequestListRelationFilter
    actionedResetRequests?: PasswordResetRequestListRelationFilter
    activityLogs?: AuthActivityLogListRelationFilter
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
  }, "id" | "identifier">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    stakeholderType?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    mustChangePassword?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastPasswordChangeAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    identifier?: StringWithAggregatesFilter<"User"> | string
    stakeholderType?: EnumStakeholderTypeWithAggregatesFilter<"User"> | $Enums.StakeholderType
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    mustChangePassword?: BoolWithAggregatesFilter<"User"> | boolean
    failedLoginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastPasswordChangeAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PasswordHistoryWhereInput = {
    AND?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    OR?: PasswordHistoryWhereInput[]
    NOT?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    id?: StringFilter<"PasswordHistory"> | string
    userId?: StringFilter<"PasswordHistory"> | string
    passwordHash?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PasswordHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    OR?: PasswordHistoryWhereInput[]
    NOT?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    userId?: StringFilter<"PasswordHistory"> | string
    passwordHash?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type PasswordHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordHistoryCountOrderByAggregateInput
    _max?: PasswordHistoryMaxOrderByAggregateInput
    _min?: PasswordHistoryMinOrderByAggregateInput
  }

  export type PasswordHistoryScalarWhereWithAggregatesInput = {
    AND?: PasswordHistoryScalarWhereWithAggregatesInput | PasswordHistoryScalarWhereWithAggregatesInput[]
    OR?: PasswordHistoryScalarWhereWithAggregatesInput[]
    NOT?: PasswordHistoryScalarWhereWithAggregatesInput | PasswordHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordHistory"> | string
    userId?: StringWithAggregatesFilter<"PasswordHistory"> | string
    passwordHash?: StringWithAggregatesFilter<"PasswordHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordHistory"> | Date | string
  }

  export type PasswordResetRequestWhereInput = {
    AND?: PasswordResetRequestWhereInput | PasswordResetRequestWhereInput[]
    OR?: PasswordResetRequestWhereInput[]
    NOT?: PasswordResetRequestWhereInput | PasswordResetRequestWhereInput[]
    id?: StringFilter<"PasswordResetRequest"> | string
    identifier?: StringFilter<"PasswordResetRequest"> | string
    userId?: StringNullableFilter<"PasswordResetRequest"> | string | null
    reason?: StringFilter<"PasswordResetRequest"> | string
    status?: EnumResetRequestStatusFilter<"PasswordResetRequest"> | $Enums.ResetRequestStatus
    actionedById?: StringNullableFilter<"PasswordResetRequest"> | string | null
    actionNote?: StringNullableFilter<"PasswordResetRequest"> | string | null
    tempPassword?: StringNullableFilter<"PasswordResetRequest"> | string | null
    requestedAt?: DateTimeFilter<"PasswordResetRequest"> | Date | string
    actionedAt?: DateTimeNullableFilter<"PasswordResetRequest"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    actionedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type PasswordResetRequestOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    userId?: SortOrderInput | SortOrder
    reason?: SortOrder
    status?: SortOrder
    actionedById?: SortOrderInput | SortOrder
    actionNote?: SortOrderInput | SortOrder
    tempPassword?: SortOrderInput | SortOrder
    requestedAt?: SortOrder
    actionedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    actionedBy?: UserOrderByWithRelationInput
  }

  export type PasswordResetRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PasswordResetRequestWhereInput | PasswordResetRequestWhereInput[]
    OR?: PasswordResetRequestWhereInput[]
    NOT?: PasswordResetRequestWhereInput | PasswordResetRequestWhereInput[]
    identifier?: StringFilter<"PasswordResetRequest"> | string
    userId?: StringNullableFilter<"PasswordResetRequest"> | string | null
    reason?: StringFilter<"PasswordResetRequest"> | string
    status?: EnumResetRequestStatusFilter<"PasswordResetRequest"> | $Enums.ResetRequestStatus
    actionedById?: StringNullableFilter<"PasswordResetRequest"> | string | null
    actionNote?: StringNullableFilter<"PasswordResetRequest"> | string | null
    tempPassword?: StringNullableFilter<"PasswordResetRequest"> | string | null
    requestedAt?: DateTimeFilter<"PasswordResetRequest"> | Date | string
    actionedAt?: DateTimeNullableFilter<"PasswordResetRequest"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    actionedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type PasswordResetRequestOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    userId?: SortOrderInput | SortOrder
    reason?: SortOrder
    status?: SortOrder
    actionedById?: SortOrderInput | SortOrder
    actionNote?: SortOrderInput | SortOrder
    tempPassword?: SortOrderInput | SortOrder
    requestedAt?: SortOrder
    actionedAt?: SortOrderInput | SortOrder
    _count?: PasswordResetRequestCountOrderByAggregateInput
    _max?: PasswordResetRequestMaxOrderByAggregateInput
    _min?: PasswordResetRequestMinOrderByAggregateInput
  }

  export type PasswordResetRequestScalarWhereWithAggregatesInput = {
    AND?: PasswordResetRequestScalarWhereWithAggregatesInput | PasswordResetRequestScalarWhereWithAggregatesInput[]
    OR?: PasswordResetRequestScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetRequestScalarWhereWithAggregatesInput | PasswordResetRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetRequest"> | string
    identifier?: StringWithAggregatesFilter<"PasswordResetRequest"> | string
    userId?: StringNullableWithAggregatesFilter<"PasswordResetRequest"> | string | null
    reason?: StringWithAggregatesFilter<"PasswordResetRequest"> | string
    status?: EnumResetRequestStatusWithAggregatesFilter<"PasswordResetRequest"> | $Enums.ResetRequestStatus
    actionedById?: StringNullableWithAggregatesFilter<"PasswordResetRequest"> | string | null
    actionNote?: StringNullableWithAggregatesFilter<"PasswordResetRequest"> | string | null
    tempPassword?: StringNullableWithAggregatesFilter<"PasswordResetRequest"> | string | null
    requestedAt?: DateTimeWithAggregatesFilter<"PasswordResetRequest"> | Date | string
    actionedAt?: DateTimeNullableWithAggregatesFilter<"PasswordResetRequest"> | Date | string | null
  }

  export type AuthActivityLogWhereInput = {
    AND?: AuthActivityLogWhereInput | AuthActivityLogWhereInput[]
    OR?: AuthActivityLogWhereInput[]
    NOT?: AuthActivityLogWhereInput | AuthActivityLogWhereInput[]
    id?: StringFilter<"AuthActivityLog"> | string
    userId?: StringNullableFilter<"AuthActivityLog"> | string | null
    identifier?: StringFilter<"AuthActivityLog"> | string
    action?: EnumAuthActivityTypeFilter<"AuthActivityLog"> | $Enums.AuthActivityType
    ipAddress?: StringNullableFilter<"AuthActivityLog"> | string | null
    userAgent?: StringNullableFilter<"AuthActivityLog"> | string | null
    metadata?: JsonNullableFilter<"AuthActivityLog">
    createdAt?: DateTimeFilter<"AuthActivityLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuthActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    identifier?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthActivityLogWhereInput | AuthActivityLogWhereInput[]
    OR?: AuthActivityLogWhereInput[]
    NOT?: AuthActivityLogWhereInput | AuthActivityLogWhereInput[]
    userId?: StringNullableFilter<"AuthActivityLog"> | string | null
    identifier?: StringFilter<"AuthActivityLog"> | string
    action?: EnumAuthActivityTypeFilter<"AuthActivityLog"> | $Enums.AuthActivityType
    ipAddress?: StringNullableFilter<"AuthActivityLog"> | string | null
    userAgent?: StringNullableFilter<"AuthActivityLog"> | string | null
    metadata?: JsonNullableFilter<"AuthActivityLog">
    createdAt?: DateTimeFilter<"AuthActivityLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuthActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    identifier?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuthActivityLogCountOrderByAggregateInput
    _max?: AuthActivityLogMaxOrderByAggregateInput
    _min?: AuthActivityLogMinOrderByAggregateInput
  }

  export type AuthActivityLogScalarWhereWithAggregatesInput = {
    AND?: AuthActivityLogScalarWhereWithAggregatesInput | AuthActivityLogScalarWhereWithAggregatesInput[]
    OR?: AuthActivityLogScalarWhereWithAggregatesInput[]
    NOT?: AuthActivityLogScalarWhereWithAggregatesInput | AuthActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthActivityLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuthActivityLog"> | string | null
    identifier?: StringWithAggregatesFilter<"AuthActivityLog"> | string
    action?: EnumAuthActivityTypeWithAggregatesFilter<"AuthActivityLog"> | $Enums.AuthActivityType
    ipAddress?: StringNullableWithAggregatesFilter<"AuthActivityLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuthActivityLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AuthActivityLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuthActivityLog"> | Date | string
  }

  export type OutboxEventWhereInput = {
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    id?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    aggregateType?: StringFilter<"OutboxEvent"> | string
    aggregateId?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    processed?: BoolFilter<"OutboxEvent"> | boolean
    processedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    payload?: SortOrder
    processed?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OutboxEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    eventType?: StringFilter<"OutboxEvent"> | string
    aggregateType?: StringFilter<"OutboxEvent"> | string
    aggregateId?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    processed?: BoolFilter<"OutboxEvent"> | boolean
    processedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    payload?: SortOrder
    processed?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OutboxEventCountOrderByAggregateInput
    _max?: OutboxEventMaxOrderByAggregateInput
    _min?: OutboxEventMinOrderByAggregateInput
  }

  export type OutboxEventScalarWhereWithAggregatesInput = {
    AND?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    OR?: OutboxEventScalarWhereWithAggregatesInput[]
    NOT?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    aggregateType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    aggregateId?: StringWithAggregatesFilter<"OutboxEvent"> | string
    payload?: JsonWithAggregatesFilter<"OutboxEvent">
    processed?: BoolWithAggregatesFilter<"OutboxEvent"> | boolean
    processedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    firstName?: StringNullableFilter<"Profile"> | string | null
    lastName?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    firstName?: StringNullableFilter<"Profile"> | string | null
    lastName?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    firstName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    email?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryCreateInput = {
    id?: string
    passwordHash: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordHistoriesInput
  }

  export type PasswordHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type PasswordHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordHistoriesNestedInput
  }

  export type PasswordHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryCreateManyInput = {
    id?: string
    userId: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type PasswordHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetRequestCreateInput = {
    id?: string
    identifier: string
    reason: string
    status?: $Enums.ResetRequestStatus
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutResetRequestsInput
    actionedBy?: UserCreateNestedOneWithoutActionedResetRequestsInput
  }

  export type PasswordResetRequestUncheckedCreateInput = {
    id?: string
    identifier: string
    userId?: string | null
    reason: string
    status?: $Enums.ResetRequestStatus
    actionedById?: string | null
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type PasswordResetRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutResetRequestsNestedInput
    actionedBy?: UserUpdateOneWithoutActionedResetRequestsNestedInput
  }

  export type PasswordResetRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionedById?: NullableStringFieldUpdateOperationsInput | string | null
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetRequestCreateManyInput = {
    id?: string
    identifier: string
    userId?: string | null
    reason: string
    status?: $Enums.ResetRequestStatus
    actionedById?: string | null
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type PasswordResetRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionedById?: NullableStringFieldUpdateOperationsInput | string | null
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthActivityLogCreateInput = {
    id?: string
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type AuthActivityLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuthActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutActivityLogsNestedInput
  }

  export type AuthActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthActivityLogCreateManyInput = {
    id?: string
    userId?: string | null
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuthActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id?: string
    eventType: string
    aggregateType: string
    aggregateId: string
    payload: JsonNullValueInput | InputJsonValue
    processed?: boolean
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OutboxEventUncheckedCreateInput = {
    id?: string
    eventType: string
    aggregateType: string
    aggregateId: string
    payload: JsonNullValueInput | InputJsonValue
    processed?: boolean
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processed?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processed?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateManyInput = {
    id?: string
    eventType: string
    aggregateType: string
    aggregateId: string
    payload: JsonNullValueInput | InputJsonValue
    processed?: boolean
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processed?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processed?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumStakeholderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StakeholderType | EnumStakeholderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStakeholderTypeFilter<$PrismaModel> | $Enums.StakeholderType
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PasswordHistoryListRelationFilter = {
    every?: PasswordHistoryWhereInput
    some?: PasswordHistoryWhereInput
    none?: PasswordHistoryWhereInput
  }

  export type PasswordResetRequestListRelationFilter = {
    every?: PasswordResetRequestWhereInput
    some?: PasswordResetRequestWhereInput
    none?: PasswordResetRequestWhereInput
  }

  export type AuthActivityLogListRelationFilter = {
    every?: AuthActivityLogWhereInput
    some?: AuthActivityLogWhereInput
    none?: AuthActivityLogWhereInput
  }

  export type ProfileNullableRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PasswordHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    stakeholderType?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    mustChangePassword?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastPasswordChangeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    stakeholderType?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    mustChangePassword?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastPasswordChangeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    stakeholderType?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    mustChangePassword?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastPasswordChangeAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumStakeholderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StakeholderType | EnumStakeholderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStakeholderTypeWithAggregatesFilter<$PrismaModel> | $Enums.StakeholderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStakeholderTypeFilter<$PrismaModel>
    _max?: NestedEnumStakeholderTypeFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumResetRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResetRequestStatus | EnumResetRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResetRequestStatusFilter<$PrismaModel> | $Enums.ResetRequestStatus
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PasswordResetRequestCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    actionedById?: SortOrder
    actionNote?: SortOrder
    tempPassword?: SortOrder
    requestedAt?: SortOrder
    actionedAt?: SortOrder
  }

  export type PasswordResetRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    actionedById?: SortOrder
    actionNote?: SortOrder
    tempPassword?: SortOrder
    requestedAt?: SortOrder
    actionedAt?: SortOrder
  }

  export type PasswordResetRequestMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    actionedById?: SortOrder
    actionNote?: SortOrder
    tempPassword?: SortOrder
    requestedAt?: SortOrder
    actionedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumResetRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResetRequestStatus | EnumResetRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResetRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResetRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResetRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumResetRequestStatusFilter<$PrismaModel>
  }

  export type EnumAuthActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthActivityType | EnumAuthActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthActivityTypeFilter<$PrismaModel> | $Enums.AuthActivityType
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuthActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    identifier?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    identifier?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    identifier?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuthActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthActivityType | EnumAuthActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthActivityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthActivityTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthActivityTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OutboxEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    payload?: SortOrder
    processed?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    processed?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    processed?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
  }

  export type PasswordResetRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput> | PasswordResetRequestCreateWithoutUserInput[] | PasswordResetRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutUserInput | PasswordResetRequestCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetRequestCreateManyUserInputEnvelope
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
  }

  export type PasswordResetRequestCreateNestedManyWithoutActionedByInput = {
    create?: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput> | PasswordResetRequestCreateWithoutActionedByInput[] | PasswordResetRequestUncheckedCreateWithoutActionedByInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutActionedByInput | PasswordResetRequestCreateOrConnectWithoutActionedByInput[]
    createMany?: PasswordResetRequestCreateManyActionedByInputEnvelope
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
  }

  export type AuthActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput> | AuthActivityLogCreateWithoutUserInput[] | AuthActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthActivityLogCreateOrConnectWithoutUserInput | AuthActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthActivityLogCreateManyUserInputEnvelope
    connect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type PasswordHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
  }

  export type PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput> | PasswordResetRequestCreateWithoutUserInput[] | PasswordResetRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutUserInput | PasswordResetRequestCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetRequestCreateManyUserInputEnvelope
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
  }

  export type PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput = {
    create?: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput> | PasswordResetRequestCreateWithoutActionedByInput[] | PasswordResetRequestUncheckedCreateWithoutActionedByInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutActionedByInput | PasswordResetRequestCreateOrConnectWithoutActionedByInput[]
    createMany?: PasswordResetRequestCreateManyActionedByInputEnvelope
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
  }

  export type AuthActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput> | AuthActivityLogCreateWithoutUserInput[] | AuthActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthActivityLogCreateOrConnectWithoutUserInput | AuthActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthActivityLogCreateManyUserInputEnvelope
    connect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumStakeholderTypeFieldUpdateOperationsInput = {
    set?: $Enums.StakeholderType
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PasswordHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PasswordHistoryUpsertWithWhereUniqueWithoutUserInput | PasswordHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    set?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    disconnect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    delete?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    update?: PasswordHistoryUpdateWithWhereUniqueWithoutUserInput | PasswordHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordHistoryUpdateManyWithWhereWithoutUserInput | PasswordHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
  }

  export type PasswordResetRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput> | PasswordResetRequestCreateWithoutUserInput[] | PasswordResetRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutUserInput | PasswordResetRequestCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetRequestUpsertWithWhereUniqueWithoutUserInput | PasswordResetRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetRequestCreateManyUserInputEnvelope
    set?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    disconnect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    delete?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    update?: PasswordResetRequestUpdateWithWhereUniqueWithoutUserInput | PasswordResetRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetRequestUpdateManyWithWhereWithoutUserInput | PasswordResetRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
  }

  export type PasswordResetRequestUpdateManyWithoutActionedByNestedInput = {
    create?: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput> | PasswordResetRequestCreateWithoutActionedByInput[] | PasswordResetRequestUncheckedCreateWithoutActionedByInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutActionedByInput | PasswordResetRequestCreateOrConnectWithoutActionedByInput[]
    upsert?: PasswordResetRequestUpsertWithWhereUniqueWithoutActionedByInput | PasswordResetRequestUpsertWithWhereUniqueWithoutActionedByInput[]
    createMany?: PasswordResetRequestCreateManyActionedByInputEnvelope
    set?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    disconnect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    delete?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    update?: PasswordResetRequestUpdateWithWhereUniqueWithoutActionedByInput | PasswordResetRequestUpdateWithWhereUniqueWithoutActionedByInput[]
    updateMany?: PasswordResetRequestUpdateManyWithWhereWithoutActionedByInput | PasswordResetRequestUpdateManyWithWhereWithoutActionedByInput[]
    deleteMany?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
  }

  export type AuthActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput> | AuthActivityLogCreateWithoutUserInput[] | AuthActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthActivityLogCreateOrConnectWithoutUserInput | AuthActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthActivityLogUpsertWithWhereUniqueWithoutUserInput | AuthActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthActivityLogCreateManyUserInputEnvelope
    set?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    disconnect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    delete?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    connect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    update?: AuthActivityLogUpdateWithWhereUniqueWithoutUserInput | AuthActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthActivityLogUpdateManyWithWhereWithoutUserInput | AuthActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthActivityLogScalarWhereInput | AuthActivityLogScalarWhereInput[]
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PasswordHistoryUpsertWithWhereUniqueWithoutUserInput | PasswordHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    set?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    disconnect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    delete?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    update?: PasswordHistoryUpdateWithWhereUniqueWithoutUserInput | PasswordHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordHistoryUpdateManyWithWhereWithoutUserInput | PasswordHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
  }

  export type PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput> | PasswordResetRequestCreateWithoutUserInput[] | PasswordResetRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutUserInput | PasswordResetRequestCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetRequestUpsertWithWhereUniqueWithoutUserInput | PasswordResetRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetRequestCreateManyUserInputEnvelope
    set?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    disconnect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    delete?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    update?: PasswordResetRequestUpdateWithWhereUniqueWithoutUserInput | PasswordResetRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetRequestUpdateManyWithWhereWithoutUserInput | PasswordResetRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
  }

  export type PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput = {
    create?: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput> | PasswordResetRequestCreateWithoutActionedByInput[] | PasswordResetRequestUncheckedCreateWithoutActionedByInput[]
    connectOrCreate?: PasswordResetRequestCreateOrConnectWithoutActionedByInput | PasswordResetRequestCreateOrConnectWithoutActionedByInput[]
    upsert?: PasswordResetRequestUpsertWithWhereUniqueWithoutActionedByInput | PasswordResetRequestUpsertWithWhereUniqueWithoutActionedByInput[]
    createMany?: PasswordResetRequestCreateManyActionedByInputEnvelope
    set?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    disconnect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    delete?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    connect?: PasswordResetRequestWhereUniqueInput | PasswordResetRequestWhereUniqueInput[]
    update?: PasswordResetRequestUpdateWithWhereUniqueWithoutActionedByInput | PasswordResetRequestUpdateWithWhereUniqueWithoutActionedByInput[]
    updateMany?: PasswordResetRequestUpdateManyWithWhereWithoutActionedByInput | PasswordResetRequestUpdateManyWithWhereWithoutActionedByInput[]
    deleteMany?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
  }

  export type AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput> | AuthActivityLogCreateWithoutUserInput[] | AuthActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthActivityLogCreateOrConnectWithoutUserInput | AuthActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthActivityLogUpsertWithWhereUniqueWithoutUserInput | AuthActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthActivityLogCreateManyUserInputEnvelope
    set?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    disconnect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    delete?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    connect?: AuthActivityLogWhereUniqueInput | AuthActivityLogWhereUniqueInput[]
    update?: AuthActivityLogUpdateWithWhereUniqueWithoutUserInput | AuthActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthActivityLogUpdateManyWithWhereWithoutUserInput | AuthActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthActivityLogScalarWhereInput | AuthActivityLogScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPasswordHistoriesInput = {
    create?: XOR<UserCreateWithoutPasswordHistoriesInput, UserUncheckedCreateWithoutPasswordHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordHistoriesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordHistoriesNestedInput = {
    create?: XOR<UserCreateWithoutPasswordHistoriesInput, UserUncheckedCreateWithoutPasswordHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordHistoriesInput
    upsert?: UserUpsertWithoutPasswordHistoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordHistoriesInput, UserUpdateWithoutPasswordHistoriesInput>, UserUncheckedUpdateWithoutPasswordHistoriesInput>
  }

  export type UserCreateNestedOneWithoutResetRequestsInput = {
    create?: XOR<UserCreateWithoutResetRequestsInput, UserUncheckedCreateWithoutResetRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActionedResetRequestsInput = {
    create?: XOR<UserCreateWithoutActionedResetRequestsInput, UserUncheckedCreateWithoutActionedResetRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionedResetRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumResetRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResetRequestStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutResetRequestsNestedInput = {
    create?: XOR<UserCreateWithoutResetRequestsInput, UserUncheckedCreateWithoutResetRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetRequestsInput
    upsert?: UserUpsertWithoutResetRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResetRequestsInput, UserUpdateWithoutResetRequestsInput>, UserUncheckedUpdateWithoutResetRequestsInput>
  }

  export type UserUpdateOneWithoutActionedResetRequestsNestedInput = {
    create?: XOR<UserCreateWithoutActionedResetRequestsInput, UserUncheckedCreateWithoutActionedResetRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionedResetRequestsInput
    upsert?: UserUpsertWithoutActionedResetRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionedResetRequestsInput, UserUpdateWithoutActionedResetRequestsInput>, UserUncheckedUpdateWithoutActionedResetRequestsInput>
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuthActivityTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuthActivityType
  }

  export type UserUpdateOneWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumStakeholderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StakeholderType | EnumStakeholderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStakeholderTypeFilter<$PrismaModel> | $Enums.StakeholderType
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumStakeholderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StakeholderType | EnumStakeholderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StakeholderType[] | ListEnumStakeholderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStakeholderTypeWithAggregatesFilter<$PrismaModel> | $Enums.StakeholderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStakeholderTypeFilter<$PrismaModel>
    _max?: NestedEnumStakeholderTypeFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumResetRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResetRequestStatus | EnumResetRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResetRequestStatusFilter<$PrismaModel> | $Enums.ResetRequestStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumResetRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResetRequestStatus | EnumResetRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResetRequestStatus[] | ListEnumResetRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResetRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResetRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResetRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumResetRequestStatusFilter<$PrismaModel>
  }

  export type NestedEnumAuthActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthActivityType | EnumAuthActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthActivityTypeFilter<$PrismaModel> | $Enums.AuthActivityType
  }

  export type NestedEnumAuthActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthActivityType | EnumAuthActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthActivityType[] | ListEnumAuthActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthActivityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthActivityTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthActivityTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PasswordHistoryCreateWithoutUserInput = {
    id?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type PasswordHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type PasswordHistoryCreateOrConnectWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    create: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryCreateManyUserInputEnvelope = {
    data: PasswordHistoryCreateManyUserInput | PasswordHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetRequestCreateWithoutUserInput = {
    id?: string
    identifier: string
    reason: string
    status?: $Enums.ResetRequestStatus
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
    actionedBy?: UserCreateNestedOneWithoutActionedResetRequestsInput
  }

  export type PasswordResetRequestUncheckedCreateWithoutUserInput = {
    id?: string
    identifier: string
    reason: string
    status?: $Enums.ResetRequestStatus
    actionedById?: string | null
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type PasswordResetRequestCreateOrConnectWithoutUserInput = {
    where: PasswordResetRequestWhereUniqueInput
    create: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetRequestCreateManyUserInputEnvelope = {
    data: PasswordResetRequestCreateManyUserInput | PasswordResetRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetRequestCreateWithoutActionedByInput = {
    id?: string
    identifier: string
    reason: string
    status?: $Enums.ResetRequestStatus
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutResetRequestsInput
  }

  export type PasswordResetRequestUncheckedCreateWithoutActionedByInput = {
    id?: string
    identifier: string
    userId?: string | null
    reason: string
    status?: $Enums.ResetRequestStatus
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type PasswordResetRequestCreateOrConnectWithoutActionedByInput = {
    where: PasswordResetRequestWhereUniqueInput
    create: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput>
  }

  export type PasswordResetRequestCreateManyActionedByInputEnvelope = {
    data: PasswordResetRequestCreateManyActionedByInput | PasswordResetRequestCreateManyActionedByInput[]
    skipDuplicates?: boolean
  }

  export type AuthActivityLogCreateWithoutUserInput = {
    id?: string
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuthActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuthActivityLogCreateOrConnectWithoutUserInput = {
    where: AuthActivityLogWhereUniqueInput
    create: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput>
  }

  export type AuthActivityLogCreateManyUserInputEnvelope = {
    data: AuthActivityLogCreateManyUserInput | AuthActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    update: XOR<PasswordHistoryUpdateWithoutUserInput, PasswordHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    data: XOR<PasswordHistoryUpdateWithoutUserInput, PasswordHistoryUncheckedUpdateWithoutUserInput>
  }

  export type PasswordHistoryUpdateManyWithWhereWithoutUserInput = {
    where: PasswordHistoryScalarWhereInput
    data: XOR<PasswordHistoryUpdateManyMutationInput, PasswordHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordHistoryScalarWhereInput = {
    AND?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
    OR?: PasswordHistoryScalarWhereInput[]
    NOT?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
    id?: StringFilter<"PasswordHistory"> | string
    userId?: StringFilter<"PasswordHistory"> | string
    passwordHash?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
  }

  export type PasswordResetRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetRequestWhereUniqueInput
    update: XOR<PasswordResetRequestUpdateWithoutUserInput, PasswordResetRequestUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetRequestCreateWithoutUserInput, PasswordResetRequestUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetRequestWhereUniqueInput
    data: XOR<PasswordResetRequestUpdateWithoutUserInput, PasswordResetRequestUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetRequestUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetRequestScalarWhereInput
    data: XOR<PasswordResetRequestUpdateManyMutationInput, PasswordResetRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetRequestScalarWhereInput = {
    AND?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
    OR?: PasswordResetRequestScalarWhereInput[]
    NOT?: PasswordResetRequestScalarWhereInput | PasswordResetRequestScalarWhereInput[]
    id?: StringFilter<"PasswordResetRequest"> | string
    identifier?: StringFilter<"PasswordResetRequest"> | string
    userId?: StringNullableFilter<"PasswordResetRequest"> | string | null
    reason?: StringFilter<"PasswordResetRequest"> | string
    status?: EnumResetRequestStatusFilter<"PasswordResetRequest"> | $Enums.ResetRequestStatus
    actionedById?: StringNullableFilter<"PasswordResetRequest"> | string | null
    actionNote?: StringNullableFilter<"PasswordResetRequest"> | string | null
    tempPassword?: StringNullableFilter<"PasswordResetRequest"> | string | null
    requestedAt?: DateTimeFilter<"PasswordResetRequest"> | Date | string
    actionedAt?: DateTimeNullableFilter<"PasswordResetRequest"> | Date | string | null
  }

  export type PasswordResetRequestUpsertWithWhereUniqueWithoutActionedByInput = {
    where: PasswordResetRequestWhereUniqueInput
    update: XOR<PasswordResetRequestUpdateWithoutActionedByInput, PasswordResetRequestUncheckedUpdateWithoutActionedByInput>
    create: XOR<PasswordResetRequestCreateWithoutActionedByInput, PasswordResetRequestUncheckedCreateWithoutActionedByInput>
  }

  export type PasswordResetRequestUpdateWithWhereUniqueWithoutActionedByInput = {
    where: PasswordResetRequestWhereUniqueInput
    data: XOR<PasswordResetRequestUpdateWithoutActionedByInput, PasswordResetRequestUncheckedUpdateWithoutActionedByInput>
  }

  export type PasswordResetRequestUpdateManyWithWhereWithoutActionedByInput = {
    where: PasswordResetRequestScalarWhereInput
    data: XOR<PasswordResetRequestUpdateManyMutationInput, PasswordResetRequestUncheckedUpdateManyWithoutActionedByInput>
  }

  export type AuthActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthActivityLogWhereUniqueInput
    update: XOR<AuthActivityLogUpdateWithoutUserInput, AuthActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuthActivityLogCreateWithoutUserInput, AuthActivityLogUncheckedCreateWithoutUserInput>
  }

  export type AuthActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthActivityLogWhereUniqueInput
    data: XOR<AuthActivityLogUpdateWithoutUserInput, AuthActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type AuthActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: AuthActivityLogScalarWhereInput
    data: XOR<AuthActivityLogUpdateManyMutationInput, AuthActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthActivityLogScalarWhereInput = {
    AND?: AuthActivityLogScalarWhereInput | AuthActivityLogScalarWhereInput[]
    OR?: AuthActivityLogScalarWhereInput[]
    NOT?: AuthActivityLogScalarWhereInput | AuthActivityLogScalarWhereInput[]
    id?: StringFilter<"AuthActivityLog"> | string
    userId?: StringNullableFilter<"AuthActivityLog"> | string | null
    identifier?: StringFilter<"AuthActivityLog"> | string
    action?: EnumAuthActivityTypeFilter<"AuthActivityLog"> | $Enums.AuthActivityType
    ipAddress?: StringNullableFilter<"AuthActivityLog"> | string | null
    userAgent?: StringNullableFilter<"AuthActivityLog"> | string | null
    metadata?: JsonNullableFilter<"AuthActivityLog">
    createdAt?: DateTimeFilter<"AuthActivityLog"> | Date | string
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPasswordHistoriesInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetRequests?: PasswordResetRequestCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordHistoriesInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordHistoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordHistoriesInput, UserUncheckedCreateWithoutPasswordHistoriesInput>
  }

  export type UserUpsertWithoutPasswordHistoriesInput = {
    update: XOR<UserUpdateWithoutPasswordHistoriesInput, UserUncheckedUpdateWithoutPasswordHistoriesInput>
    create: XOR<UserCreateWithoutPasswordHistoriesInput, UserUncheckedCreateWithoutPasswordHistoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordHistoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordHistoriesInput, UserUncheckedUpdateWithoutPasswordHistoriesInput>
  }

  export type UserUpdateWithoutPasswordHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetRequests?: PasswordResetRequestUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutResetRequestsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResetRequestsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResetRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResetRequestsInput, UserUncheckedCreateWithoutResetRequestsInput>
  }

  export type UserCreateWithoutActionedResetRequestsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestCreateNestedManyWithoutUserInput
    activityLogs?: AuthActivityLogCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionedResetRequestsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: AuthActivityLogUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionedResetRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionedResetRequestsInput, UserUncheckedCreateWithoutActionedResetRequestsInput>
  }

  export type UserUpsertWithoutResetRequestsInput = {
    update: XOR<UserUpdateWithoutResetRequestsInput, UserUncheckedUpdateWithoutResetRequestsInput>
    create: XOR<UserCreateWithoutResetRequestsInput, UserUncheckedCreateWithoutResetRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResetRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResetRequestsInput, UserUncheckedUpdateWithoutResetRequestsInput>
  }

  export type UserUpdateWithoutResetRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResetRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUpsertWithoutActionedResetRequestsInput = {
    update: XOR<UserUpdateWithoutActionedResetRequestsInput, UserUncheckedUpdateWithoutActionedResetRequestsInput>
    create: XOR<UserCreateWithoutActionedResetRequestsInput, UserUncheckedCreateWithoutActionedResetRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionedResetRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionedResetRequestsInput, UserUncheckedUpdateWithoutActionedResetRequestsInput>
  }

  export type UserUpdateWithoutActionedResetRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUpdateManyWithoutUserNestedInput
    activityLogs?: AuthActivityLogUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionedResetRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutActivityLogsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestCreateNestedManyWithoutActionedByInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUpdateManyWithoutActionedByNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    identifier: string
    stakeholderType?: $Enums.StakeholderType
    passwordHash: string
    status?: $Enums.UserStatus
    mustChangePassword?: boolean
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastPasswordChangeAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordHistories?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
    resetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutUserInput
    actionedResetRequests?: PasswordResetRequestUncheckedCreateNestedManyWithoutActionedByInput
    activityLogs?: AuthActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    stakeholderType?: EnumStakeholderTypeFieldUpdateOperationsInput | $Enums.StakeholderType
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPasswordChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordHistories?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
    resetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutUserNestedInput
    actionedResetRequests?: PasswordResetRequestUncheckedUpdateManyWithoutActionedByNestedInput
    activityLogs?: AuthActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PasswordHistoryCreateManyUserInput = {
    id?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type PasswordResetRequestCreateManyUserInput = {
    id?: string
    identifier: string
    reason: string
    status?: $Enums.ResetRequestStatus
    actionedById?: string | null
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type PasswordResetRequestCreateManyActionedByInput = {
    id?: string
    identifier: string
    userId?: string | null
    reason: string
    status?: $Enums.ResetRequestStatus
    actionNote?: string | null
    tempPassword?: string | null
    requestedAt?: Date | string
    actionedAt?: Date | string | null
  }

  export type AuthActivityLogCreateManyUserInput = {
    id?: string
    identifier: string
    action: $Enums.AuthActivityType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PasswordHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionedBy?: UserUpdateOneWithoutActionedResetRequestsNestedInput
  }

  export type PasswordResetRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionedById?: NullableStringFieldUpdateOperationsInput | string | null
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionedById?: NullableStringFieldUpdateOperationsInput | string | null
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetRequestUpdateWithoutActionedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutResetRequestsNestedInput
  }

  export type PasswordResetRequestUncheckedUpdateWithoutActionedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetRequestUncheckedUpdateManyWithoutActionedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumResetRequestStatusFieldUpdateOperationsInput | $Enums.ResetRequestStatus
    actionNote?: NullableStringFieldUpdateOperationsInput | string | null
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    action?: EnumAuthActivityTypeFieldUpdateOperationsInput | $Enums.AuthActivityType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PasswordHistoryDefaultArgs instead
     */
    export type PasswordHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PasswordHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PasswordResetRequestDefaultArgs instead
     */
    export type PasswordResetRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PasswordResetRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuthActivityLogDefaultArgs instead
     */
    export type AuthActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuthActivityLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OutboxEventDefaultArgs instead
     */
    export type OutboxEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OutboxEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProfileDefaultArgs instead
     */
    export type ProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProfileDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}