import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import styles from "./app.module.css";
import "ethers";

type Profile = {
    id?: string;
    handle?: string;
    owner?: string;
};

export default function ProtocolApp() {
    const { address, isConnected } = useAccount();

    const [formData, setFormData] = useState<Profile>({});
    const [isMinting, setIsMinting] = useState(false);
    const [mintSuccessful, setMintSuccessful] = useState(false);
    const [tokenId, setTokenId] = useState(null);

    async function mint(profile: Profile) {
        // TODO: Switch to axios instance
        const response = await fetch("http://localhost:3030/contract", {
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify(profile),
        });

        return response.json();
    }

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        setIsMinting(true);
        const response = await mint(formData);
        setIsMinting(false);

        if (response.success) {
            setTokenId(parseInt(response.tokenId.hex));
            setMintSuccessful(true);
        }
    }

    useEffect(() => {
        if (isConnected) {
            setFormData((prevData) => ({
                ...prevData,
                owner: address,
                id: "test",
            }));
        }
    }, [isConnected, address]);

    return (
        <>
            <main className="py-8">
                <section className="container flex flex-wrap">
                    <div className="w-full lg:max-w-80 lg:pl-4">
                        <div className="bg-white shadow-normal border rounded-[30px] p-6 center flex-col justify-center">
                            <div className="flex justify-between items-center">
                                {!isConnected ? (
                                    <h2 className="font-semibold text-xl md:text-3xl mb-4">
                                        Connect your WEB3 wallet and claim your
                                        handle now!
                                    </h2>
                                ) : (
                                    <h2 className="font-semibold text-xl md:text-3xl mb-4">
                                        Wallet Connected
                                    </h2>
                                )}
                                <div className="font-semibold text-lg mb-4 justify-self-end">
                                    <ConnectButton />
                                </div>
                            </div>

                            <div className="container">
                                <div className="w-full max-w-[1000px] mx-auto my-10 bg-white shadow-normal  rounded-[25px] p-8 md:py-14 md:px-20">
                                    {isConnected &&
                                    !isMinting &&
                                    !mintSuccessful ? (
                                        <>
                                            <h1 className="font-bold text-2xl mb-4"></h1>
                                            <form
                                                className="flex flex-col justify-center items-center"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="my-6">
                                                    <label
                                                        htmlFor="handleInput"
                                                        className="font-medium mb-2 leading-none inline-block"
                                                    >
                                                        Handle
                                                    </label>
                                                    <input
                                                        id="handleInput"
                                                        name="handle"
                                                        type="text"
                                                        className="w-auto mx-4 rounded-full border-slate-300"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="my-6">
                                                    <label
                                                        htmlFor="address"
                                                        className="font-medium mb-2 leading-none inline-block"
                                                    >
                                                        Address
                                                    </label>
                                                    <label
                                                        id="address"
                                                        className="w-auto mx-4 rounded-full border-slate-300"
                                                    >
                                                        {address.slice(0, 10) +
                                                            "..." +
                                                            address.slice(
                                                                address.length -
                                                                    8
                                                            )}
                                                    </label>
                                                </div>

                                                <div className="text-left">
                                                    <button
                                                        type="submit"
                                                        className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                                    >
                                                        MINT
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    ) : mintSuccessful ? (
                                        <h1
                                            className={
                                                " font-bold text-2xl mb-4"
                                            }
                                        >
                                            Minting Complete! Your token id is{" "}
                                            {`'${tokenId}'`} with your handler{" "}
                                            {formData.handle}.
                                        </h1>
                                    ) : (
                                        <h1
                                            className={
                                                styles.loading +
                                                " font-bold text-2xl mb-4"
                                            }
                                        >
                                            Loading...
                                        </h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
