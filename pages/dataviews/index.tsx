import React from "react";
import NaiveBinary from "./naiveBinary";
import BufferDataviewer from "./BufferDataviewer";
import UtfViewer from "./UtfViewer";
import TextEncoded from "../../components/BinaryUTF8/TextEncoded";
import { Container } from "./Layout";

function Dataviews() {
  return (
    <Container>
      <TextEncoded />
      <hr />
      {/* <UtfViewer /> */}
      <hr />
      {/* <BufferDataviewer /> */}
      <hr />
      {/* <NaiveBinary /> */}
    </Container>
  );
}

export default Dataviews;
