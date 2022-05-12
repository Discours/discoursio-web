import { useRouteData } from "solid-app-router"
import { Component } from "solid-js"
import './about.scss'

export const AboutArticle: Component = () => {
    const data = useRouteData<{ slug: string, body: string }>()
    return (
        <div>
            <div innerHTML={data.body}></div>
        </div>
    )
}