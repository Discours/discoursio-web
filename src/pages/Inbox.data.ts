import { RouteDataFunc } from "solid-app-router";


export interface InboxRouteData {
    [key:string]: any
}

export const InboxData: RouteDataFunc = (): InboxRouteData => {
    // TODO: implement inbox data preprocessing
    return {}
}