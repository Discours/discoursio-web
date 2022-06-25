import { useI18n } from "@solid-primitives/i18n";
import { RouteDataFunc, useRouteData } from "solid-app-router";


interface SearchRouteData {
    [key:string]: any
}

const SearchData: RouteDataFunc = (): SearchRouteData => {
    // TODO: implement search data preprocessing
    return {}
}

export default () => {
    const [t] = useI18n()
    const data = useRouteData<SearchRouteData>()
    return (<>
        {t('Search')}
    </>)
}