import type { ReactNode } from "react"
import type { IKeyGenericValuePair } from "./arrayTypeInterfaces"

export interface IPath {
    path: string,
    name: string,
    element: ReactNode,
    index: boolean,
    parent?: string,
    queryParams?: IKeyGenericValuePair<string>[]
}

export interface IPathResult {
    path: string
    name: string
}