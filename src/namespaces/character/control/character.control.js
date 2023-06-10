import { characterItemType } from "../const/character.const.js";

export const generateDraftCharacterItems = () => {
  return [
    { type: characterItemType.head, name: "Puppet Draft Head" },
    { type: characterItemType.body, name: "Puppet Draft Body" },
    { type: characterItemType.hand, name: "Puppet Draft Hand" },
    { type: characterItemType.hand, name: "Puppet Draft Hand" },
    { type: characterItemType.leg, name: "Puppet Draft Leg" },
    { type: characterItemType.leg, name: "Puppet Draft Leg" },
  ];
};
