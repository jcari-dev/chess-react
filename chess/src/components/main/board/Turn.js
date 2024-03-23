import { Heading } from "@chakra-ui/react";

function Turn({status}) {

  let text = ""

  if(status === false){
    text = "White's turn."
  } else {
    text = "Black's turn."
  }
  return (
    <div>
      <Heading>{text}</Heading>
    </div>
  );
}

export default Turn;
