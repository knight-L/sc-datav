import type { ComponentProps } from "react";
import styled from "styled-components";

const GradientBtn = styled.button<{
  $color?: string[];
}>`
  position: relative;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ $color }) =>
      `conic-gradient(from 0deg, ${$color?.join(", ") ?? "#aca891, #6e918c"})`};
    z-index: -2;
    filter: blur(10px);
    transform: rotate(0deg);
    transition: transform 1.5s ease-in-out;
  }

  &:hover::before {
    transform: rotate(180deg);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 3px;
    background: black;
    border-radius: 47px;
    z-index: -1;
    filter: blur(5px);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const GradientText = styled.div<{
  $color?: string[];
}>`
  color: transparent;
  background: ${({ $color }) =>
    `conic-gradient(from 0deg, ${$color?.join(", ") ?? "#aca891, #6e918c"})`};
  background-clip: text;
`;

export default function Button(props: ComponentProps<typeof GradientBtn>) {
  const { children, $color, ...args } = props ?? {};
  return (
    <GradientBtn $color={$color} {...args}>
      <GradientText $color={$color}>{children}</GradientText>
    </GradientBtn>
  );
}
