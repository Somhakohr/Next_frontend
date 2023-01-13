// useRequest.js

import { useQuery, gql } from "@apollo/client";
import { request } from "graphql-request";

const API_URL = `http://localhost:3000/api/graphql`;

const getProfileByHandleQueryDocument = gql`
        query getProfileByHandle($handle: String!) {
            getProfile(where: { handle: $handle }) {
                handle
            }
        }
    `;
export const getProfileByHandleIdQuery = async (handle: string) => {
    const { getProfile } = await request(
        API_URL,
        getProfileByHandleQueryDocument,
        {
            handle: handle,
        }
    ).catch((err) => {
        return { getProfile: null };
    });

    return getProfile;
};

