import React, { useState, useEffect } from "react";

interface SvgIconProps {
  name: string;
  size?: number;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 30,
  className = "",
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(`/images/icons/svg/${name}.svg`);
        if (!response.ok) throw new Error(`SVG ${name} not found`);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(error);
        setSvgContent(null);
      }
    };

    fetchSvg();
  }, [name]);

  if (!svgContent) return <span>SVG</span>;

  return (
    <span
      className={`svg-icon ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgIcon;
