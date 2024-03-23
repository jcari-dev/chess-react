import { Heading } from "@chakra-ui/react";

function Turn({status}) {

  let text = ""

  if(status === false){
    text = "White's move."
  } else {
    text = "Black's move."
  }
  return (
    <div>
      <Heading>{text}</Heading>
    </div>
  );
}

export default Turn;
