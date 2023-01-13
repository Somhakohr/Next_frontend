import { useRouter } from "next/router";
import MintProfileSummary from "../components/mint-profile-summary";
import { useStore } from "../constants/code";
import { useEffect, useState } from "react";

export default function MintSummary() {
    const userObj = useStore<any>((state) => state.userObj);
    let userState = useStore((state) => state.userProfile);
    const [userProfile, setUserProfile ] = useState(userState);

    const router = useRouter();

    useEffect

    useEffect(() => {

        if (!router?.query['h']) router.back()
        else {
        const decoded_handle = Buffer.from(router?.query['h'] as string, "base64").toString("ascii");
        setUserProfile({...userState, handle: decoded_handle, email: userObj.email});
    }
    }, [router, userState, userObj])


    return (
        <div className="container">
            <MintProfileSummary userProfile={userProfile} />
        </div>
    );
}
