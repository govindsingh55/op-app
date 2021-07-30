import { Box } from "@material-ui/core";
import React from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Login from "./Login";

export default function Home() {
  function Banner() {
    return (
      <Box>
        <img
          src={toAbsoluteUrl("/media/bg/hero-bg-desktop.webp")}
          width="100%"
          alt="Banner"
          style={{
            backgroundSize: "cover",
          }}
        />
      </Box>
    );
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Banner />
        <div style={{ margin: "12vh 0px" }}>
          <Login />
        </div>
      </div>
    </>
  );
}
