import React from 'react';
import './styles/cube.css';

const Cube = ({ number }) => {
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    setAngle((number - 1) * 18);
  }, [number]);

  return (
    <div className="cube">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="cube-face">
          {index + 1}
        </div>
      ))}
      <style>
        {`
          .cube {
            transform: rotateY(${angle}deg);
          }
        `}
      </style>
    </div>
  );
};

export default Cube;