export type EntityId = string

export interface IHasId<IdType> {
    get id(): IdType
    set id(value: IdType)
}
