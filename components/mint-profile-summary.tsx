import { useEffect, useState } from "react";

export default function MintProfileSummary({
    userProfile,
}: {
    userProfile: any | undefined | null;
}) {
    console.log({userProfile})
    const ListInfo = userProfile ? (
        Object.keys(userProfile).map((key) => {
            if (
                key === "profile" ||
                key === "referal_code" ||
                key === "date" ||
                key === "user" ||
                key === "vcount"
            )
                return;

            let label: string = key.toLowerCase();
            if (!userProfile[key]) return;
            const value: string = userProfile[key].toString();
            if (key === "pref_location") label = "Preferred Location";
            if (key === "prejobtype") label = "Preferred Job Type";
            if (key === "yearofexp") label = "Preferred Job Type";

            return (
                <div className="my-2" key={key}>
                    <label
                        htmlFor={key}
                        className="font-medium text-base mb-2 leading-none inline-block text-black"
                    >
                        {label}
                    </label>
                    <label
                        id={key}
                        className="font-medium text-base w-auto mx-4 text-black"
                    >
                        {value}
                    </label>
                </div>
            );
        })
    ) : (
        <></>
    );

    if (!userProfile)
        return (
            <>
                {" "}
                <h1>Loading</h1>
            </>
        );
    return (
        <div className="container">
            <div className="w-full max-w-[1000px] mx-auto my-10 bg-white shadow-normal border border-slate-700 rounded-[25px] p-8 md:py-14 md:px-20 flex flex-col justify-center items-center text-black">
                <h2 className="font-semibold text-lg md:text-3xl mb-4">
                    Profile Summary
                </h2>
                {ListInfo}
            </div>
        </div>
    );
}
