import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5e8;
`;

export default function Loading() {
  return (
    <Wrapper>
      <svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGradWarm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8b10a" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8b10a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8b10a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGradWarm1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q75,100 150,50 T300,50"
          fill="none"
          stroke="url(#waveGradWarm)"
          strokeWidth="2">
          <animate
            attributeName="d"
            values="M0,50 Q75,100 150,50 T300,50; M0,50 Q75,0 150,50 T300,50; M0,50 Q75,100 150,50 T300,50"
            dur="4s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,50 Q75,0 150,50 T300,50"
          fill="none"
          stroke="url(#waveGradWarm1)"
          strokeWidth="2">
          <animate
            attributeName="d"
            values="M0,50 Q75,0 150,50 T300,50; M0,50 Q75,100 150,50 T300,50; M0,50 Q75,0 150,50 T300,50"
            dur="4s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </Wrapper>
  );
}
