import { Heading } from "@chakra-ui/react";

function Turn({status, turnNo}) {

  let text = ""

  if(status === false){
    text = `White's move. (${turnNo})`
  } else {
    text = `Black's move. (${turnNo})`
  }
  return (
    <div>
      <Heading>{text}</Heading>
    </div>
  );
}

export default Turn;
