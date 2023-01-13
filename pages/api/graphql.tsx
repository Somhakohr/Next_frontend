import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

function isTrueStr(str: boolean | null) {
    return (
        str === true || (str != null && str.toString().toLowerCase() === "true")
    );
}

async function prepareHeaders(req: NextApiRequest) {
    const token = (await getToken({ req })) || "";
    const signedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET as string);
    let headers = {
        "content-type": "application/json",
        authorization: signedToken,
    };
    return headers;
}

export default async function _(
    _req: NextApiRequest,
    _res: {
        statusCode: number;
        setHeader: (arg0: string, arg1: string) => void;
        json: (arg0: any) => void;
        end: () => void;
    }
) {
    let headers = await prepareHeaders(_req);

    const query = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers,
        body: JSON.stringify({
            operationName: _req.body.operationName,
            variables: _req.body.variables,
            query: _req.body.query,
        }), // body data type must match "Content-Type" header
    };

    const graphqlBaseUrl = process.env.GRAPHQL_ENDPOINT as string;
    const res = await fetch(graphqlBaseUrl, query);
    const json = await res.json();
    _res.statusCode = 200;
    _res.setHeader("content-type", "application/json");
    _res.setHeader("cache-control", "no-store, max-age=0");
    _res.json(json);
    _res.end();
}
