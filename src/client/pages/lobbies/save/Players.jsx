// import React from "react";
// import FlexBox from "components/flexbox/FlexBox";
// import { StoreContext } from "store";
// import { List } from "./List";

// export default function () {
//   const { state, dispatch } = React.useContext(StoreContext);

//   return (
//     <FlexBox
//       height="6/12"
//       width="full"
//       className="justify-center items-center sm:w-1/3 sm:h-1/3"
//     >
//       <FlexBox direction="col" className="border border-black p-5 max-h-11/12">
//         <span>Players</span>
//         <FlexBox direction="col" className="overflow-y-scroll max-h-64">
//           <List object={state.players} name="player" />
//         </FlexBox>
//       </FlexBox>
//     </FlexBox>
//   );
// }
