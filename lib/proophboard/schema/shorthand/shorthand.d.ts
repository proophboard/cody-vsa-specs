export interface ShorthandObject {
    [prop: string]: string | ShorthandObject;
}
export type Shorthand = string | ShorthandObject;
export declare const isShorthand: (schema: any) => schema is Shorthand;
export declare const isObject: (schema: string | ShorthandObject) => schema is ShorthandObject;
export declare const isList: (schema: Shorthand) => boolean;
export declare const isPrimitive: (schema: string | ShorthandObject) => boolean;
export declare const isString: (schema: string | ShorthandObject, format?: string) => boolean;
export declare const isRef: (schema: string | ShorthandObject) => boolean;
//# sourceMappingURL=shorthand.d.ts.map