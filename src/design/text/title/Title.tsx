import React from "react"
import styles from "./Title.module.css"

type TitleProps = {
    title: string
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    color?: string
    fontSize?: number
    isBold?: boolean
    isItalic?: boolean
}

const Title: React.FC<TitleProps> = ({ heading, title, color = "black", fontSize = 16, isBold = false, isItalic = false }: TitleProps) => {

    const titleStyle: React.CSSProperties = {
        color: color,
        fontSize: `${fontSize}px`,
        fontWeight: "normal",
        fontFamily: "Montserrat, Lucida Sans,Lucida Sans Regular,Lucida Grande,Lucida Sans Unicode,Geneva,Verdana, sans-serif",
    }

    if (isBold) {
        titleStyle.fontWeight = "bold"
    }

    if (isItalic) {
        titleStyle.fontStyle = "italic"
    }

    const switchHeading = (heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
        switch (heading) {
            case "h1":
                return <h1 className={styles.title} style={titleStyle}>{title}</h1>
            case "h2":
                return <h2 className={styles.title} style={titleStyle}>{title}</h2>
            case "h3":
                return <h3 className={styles.title} style={titleStyle}>{title}</h3>
            case "h4":
                return <h4 className={styles.title} style={titleStyle}>{title}</h4>
            case "h5":
                return <h5 className={styles.title} style={titleStyle}>{title}</h5>
            case "h6":
                return <h6 className={styles.title} style={titleStyle}>{title}</h6>
            default:
                return <h1 className={styles.title} style={titleStyle}>{title}</h1>
        }
    }

    return (
        <>
            {switchHeading(heading)}
        </>
    )
}
export default Title