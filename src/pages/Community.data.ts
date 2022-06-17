import { RouteDataFunc } from "solid-app-router"

export interface CommunityRouteData {
    readonly loading: boolean
}

export const CommunityData: RouteDataFunc = (): CommunityRouteData => {
    return {
        get loading() {
            return false // TODO
        }
    }
}