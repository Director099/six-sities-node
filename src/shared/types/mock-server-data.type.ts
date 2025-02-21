import {CityNames, ComfortType, HousingType} from "./offer.type.js";

export type MockServerDataType = {
  titles: string[],
  descriptions: string[],
  cityNames: CityNames[],
  comforts: ComfortType[],
  previews: string[],
  types: HousingType[],
  images: string[],
  users: string[]
  avatarUrls: string[],
  emails: string[],
}
