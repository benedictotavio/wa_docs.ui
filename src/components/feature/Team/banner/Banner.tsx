import Paragraph from "../../../../design/text/paragraph/Paragraph";
import Title from "../title/Title";

interface BannerProps {
    title: string;
    description: string;
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center">
          <Title title={title} />
          <Paragraph>
            {description}
          </Paragraph>
        </div>
    );
};

export default Banner;