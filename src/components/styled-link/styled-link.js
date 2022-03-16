import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited, &:active {
  color: inherit;

  &:hover {
    color: #9DAAF2;
  }
}
`
