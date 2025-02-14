import styles from "./Paragraph.module.css"

type ParagraphProps = {
    children: React.ReactNode;
    fontSize?: number;
    fontFamily?: 'Montserrat' | 'Roboto' | 'Arial' | 'Helvetica' | 'Questrial'
    spacing?: 'basic' | 'medium' | 'large';
};

const Paragraph: React.FC<ParagraphProps> = ({ children, fontSize, fontFamily = 'Arial', spacing = 'basic' }: ParagraphProps) => {

    const paragraphStyle: React.CSSProperties = {
        fontSize: `${fontSize}px`,
        fontFamily: `${fontFamily}, Lucida Sans,Lucida Sans Regular,Lucida Grande,Lucida Sans Unicode,Geneva,Verdana, sans-serif`,
    }

    switch (spacing) {
        case 'basic':
            paragraphStyle.margin = '0 0 10px 0';
            break;
        case 'medium':
            paragraphStyle.margin = '0 0 20px 0';
            break;
        case 'large':
            paragraphStyle.margin = '0 0 30px 0';
    }

    return (
        <p className={styles.paragraph} style={paragraphStyle}>
            {children}
        </p>
    )
}

export default Paragraph