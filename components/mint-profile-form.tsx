import { useState } from "react";
// import { contractAxiosAPIInstance } from "../pages/api/axiosApi";
import axios from "axios";
import { gql, useQuery as useGraphqlQuery } from "@apollo/client";
import { getProfileByHandleIdQuery } from "../graphql/graphqlQueries";
import { createProfileQuery } from "../graphql/graphqlMutations";
import { useStore } from "../constants/code";
import { useRouter } from "next/router";

export default function MintProfileForm({ profile, address }) {

    const [handle, setHandle] = useState("");
    const [minted, setMinted] = useState(false);
    const [error, setError] = useState({error: false, message: ""})

    const router = useRouter();


    const checkHandle = async (handle: string) => {
        const data = await getProfileByHandleIdQuery(handle);
        if (data) setError({error: true, message: "Handle already in use"})
        else setError({error: false, message: ""})
    };
    

    const handleMint = (e) => {
        e.preventDefault();

        if (error.error) return;

        const encodedString = Buffer.from(handle).toString('base64');

        //Send encoded handle
        router.push(`/mint?h=${encodedString}`);
    }




    if (minted)
        return (
            <div className="m-8 p-8  bg-white shadow-normal rounded-[20px]">
                <div className="flex flex-wrap items-center justify-between mb-10">
                    <p>Account Minted! Check your wallet for an SOP token.</p>
                </div>
            </div>
        );

    return (
        <form
            className="bg-[#f5f5f5] rounded-[20px] py-6 flex-col"
            onSubmit={handleMint}
        >
            <div className="mb-6">
                <label
                    htmlFor="handle"
                    className="font-medium m-2 leading-none inline-block"
                >
                    Handle
                </label>
                <input
                    type="text"
                    id="handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    onBlur={(e) => checkHandle(e.target.value)}
                    placeholder="Ex: mr_dev"
                    className="w-full rounded-full border-slate-300"
                    required
                />
            {error.error && <p className="italic text-red-400 ml-2">{error.message}*</p>}
            </div>
            <button
                type="submit"
                className=" bg-gradient-to-r from-[#6D27F9] to-somhakohr text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
            >
                Mint Profile
            </button>
        </form>
    );
}
