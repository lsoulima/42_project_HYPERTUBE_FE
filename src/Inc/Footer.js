import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styled from "styled-components";

const Container = styled.div`
  height: 100px;
  background: #202026;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Footer() {
  return (
    <Container>
      <Typography variant="body2" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://localhost:3000/">
          HyperTube
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
}
