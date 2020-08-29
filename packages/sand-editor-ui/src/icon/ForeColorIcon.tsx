import * as React from 'react';

type ForeColorIconProps = {
  fill?: string;
  stroke?: string;
};

const ForeColorIcon: React.SFC<ForeColorIconProps> = (
  props: ForeColorIconProps
) => {
  const { fill, stroke } = props;

  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <g
        id="color-font"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          fill={fill}
          stroke={stroke}
          strokeWidth="0.5"
          x="2"
          y="12.75"
          width="12"
          height="1.5"
          rx="0.125"
        />
        <path
          // eslint-disable-next-line max-len
          d="M5.29102819,11.25 L3.96365715,11.25 C3.87952002,11.25 3.8113134,11.1817934 3.8113134,11.0976562 C3.8113134,11.08076 3.81412419,11.0639814 3.81963067,11.0480076 L7.0756112,1.60269506 C7.09679504,1.5412426 7.15463644,1.5 7.21963767,1.5 L8.81868806,1.5 C8.883726,1.5 8.94159158,1.54128846 8.96274706,1.60278951 L12.2118,11.048102 C12.239168,11.1276636 12.1968568,11.2143472 12.1172952,11.2417152 C12.1013495,11.2472004 12.0846037,11.25 12.067741,11.25 L10.6761419,11.25 C10.6099165,11.25 10.5512771,11.2072154 10.531066,11.1441494 L9.69970662,8.55 L6.27433466,8.55 L5.43599205,11.1444975 C5.41567115,11.2073865 5.35711879,11.25 5.29102819,11.25 Z M8.02635163,3.18571429 L7.96199183,3.18571429 L6.63904023,7.30714286 L9.33500105,7.30714286 L8.02635163,3.18571429 Z"
          id="A"
          fill="#595959"
        />
      </g>
    </svg>
  );
};

export default ForeColorIcon;
