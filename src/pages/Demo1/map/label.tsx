import { Html } from "@react-three/drei";
import styled from "styled-components";

const Label = styled(Html)`
  pointer-events: none;
  width: max-content;
  display: flex;
  background: #ffffff;
  border: 1px solid currentColor;
  color: #fdb961;
  font-size: 14px;
  padding-inline: 4px;
  border-radius: 4px;
`;

export default Label;
