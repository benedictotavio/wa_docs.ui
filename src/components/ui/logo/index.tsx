interface LogoProps {
  imageSmall: string;
  imageMedium: string;
  imageLarge: string;
  imageAlt: string;
  className?: string;
  onClick?: () => void;
}

const Logo = ({
  imageSmall = "",
  imageMedium = "",
  imageLarge = "",
  imageAlt = "",
  className = "",
  onClick = () => {},
}: LogoProps) => {
  return (
    <>
      <button
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
        className={`bg-transparent border-0 p-0 ${className}`}
        style={{
          cursor: "pointer",
        }}
      >
        <picture className={className}>
          <source
            type="image/png"
            media="(max-width: 768px)"
            srcSet={`${imageSmall} 768w`}
            sizes="768px"
          />
          <source
            type="image/png"
            media="(max-width: 1024px)"
            srcSet={`${imageMedium} 1024w`}
            sizes="1024px"
          />
          <source
            type="image/png"
            media="(min-width: 1025px)"
            srcSet={`${imageLarge} 1024w`}
            sizes="1024px"
          />
          <img src={imageLarge} alt={imageAlt} />
        </picture>
      </button>
      <div>
        <span className="text-primary fw-bold fs-3">
          WA
        </span>
        &nbsp;
        <span>Docs</span>
      </div>
    </>
  );
};
export default Logo;
