import { useRouter } from "next/router";
import create from "zustand";
import shallow from "zustand/shallow";

// export const var1 = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   // myPopulation: () => set((state,num) => ({ bears: num })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

type State = {
  userName: string;
  userImg: string;
  userCImg: string;
  userType: string;
  userObj: {};
  userProfile: {};
  accessToken: string;
  country: {};
  cities: {};
  param1: "";
};

type Action = {
  updateUserName: (userName: State["userName"]) => void;
  updateUserImg: (userImg: State["userImg"]) => void;
  updateUserCImg: (userCImg: State["userCImg"]) => void;
  updateUserType: (userType: State["userType"]) => void;
  updateUserObj: (userObj: State["userObj"]) => void;
  updateUserProfile: (userProfile: State["userProfile"]) => void;
  updateAccessToken: (accessToken: State["accessToken"]) => void;
  updateCountry: (country: State["country"]) => void;
  updateCities: (cities: State["cities"]) => void;
  updateParam1: (param1: State["param1"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  userName: "",
  userImg: "",
  userCImg: "",
  userType: "",
  userObj: {},
  userProfile: {},
  accessToken: "",
  country: {},
  cities: {},
  param1: "",
  updateUserName: (userName) => set(() => ({ userName: userName })),
  updateUserImg: (userImg) => set(() => ({ userImg: userImg })),
  updateUserCImg: (userCImg) => set(() => ({ userCImg: userCImg })),
  updateUserType: (userType) => set(() => ({ userType: userType })),
  updateUserObj: (userObj) => set(() => ({ userObj: userObj })),
  updateUserProfile: (userProfile) => set(() => ({ userProfile: userProfile })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
  updateCountry: (country) => set(() => ({ country: country })),
  updateCities: (cities) => set(() => ({ cities: cities })),
  updateParam1: (param1) => set(() => ({ param1: param1 })),
}));
