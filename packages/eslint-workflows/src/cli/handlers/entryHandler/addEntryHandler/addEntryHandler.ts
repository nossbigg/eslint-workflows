import { CommandHandler } from "../../typedefs";
import { getCommonConfig } from "../../../../common";

export const addEntryHandler: CommandHandler = () => {
  console.log("entry - add");

  const commonConfig = getCommonConfig();
  console.log(commonConfig);
};
