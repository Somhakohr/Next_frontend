import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { JwtUtils, UrlUtils } from "../../../hooks/Utils";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

namespace NextAuthUtils {
  export const refreshToken = async function (refreshToken) {
    try {
      const response = await axios.post(
        // "http://localhost:8000/api/djrestauth//token/refresh/",
        UrlUtils.makeUrl(
          process.env.BACKEND_API_BASE,
          "djrestauth",
          "token",
          "refresh",
        ),
        {
          refresh: refreshToken,
        },
      );

      const { access, refresh } = response.data;
      return [access, refresh];
    } catch {
      return [null, null];
    }
  };
}

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 5000,
  headers: {
      // 'Authorization': "JWT " + access_token,
      'Content-Type': 'application/json',
      'accept': 'application/json'
  }
});

const settings: NextAuthOptions = {
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = {id: "1",email: credentials.email, password: credentials.password }
        if (user) {
        return user;
        }
        else{
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      
      console.log("acc",account);
      console.log("user",user);
      console.log("token",token);
      
      if (user) {

       

        if (account.provider === "google") {
          const accessToken = account.access_token;
          const idToken = account.id_token;

          await axiosInstance.post('/auth/signin/'+account.provider+'/', {
            access_token: accessToken,
            id_token: idToken,
          }).then((response)=>{
            const { access_token, refresh_token } = response.data;
            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
            return token;
          }).catch((err)=>{
            console.log(err);
          });
        }
        // else if(account.provider === "linkedin"){
        //   const accessToken = account.access_token;
        //   // const idToken = account.id_token;
        //   // console.log("link",account);
        //   await axiosInstance.post('/auth/signin/'+account.provider+'/', {
        //     access_token: accessToken,
        //   }).then((response)=>{
        //     const { access_token, refresh_token } = response.data;
        //     token = {
        //       ...token,
        //       accessToken: access_token,
        //       refreshToken: refresh_token,
        //     };
        //     return token;
        //   }).catch((err)=>{
        //     console.log(err);
        //   });
        // }
        else if (account.provider === "github") {
          console.log("naman",account);
          const accessToken = account.access_token;
          // const idToken = account.id_token;

          await axiosInstance.post('/auth/signin/'+account.provider+'/', {
            access_token: accessToken,
            // id_token: idToken,
          }).then((response)=>{
            const { access_token, refresh_token } = response.data;
            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
            return token;
          }).catch((err)=>{
            console.log(err);
          });
        }
        else if (account.provider === "credentials") {
          await axiosInstance.post('/auth/login/', {
              email: user.email,
              password: user.password,
          }).then((response)=>{
            console.log(response);
            const { access, refresh } = response.data.tokens;
            token = {
              ...token,
              accessToken: access,
              refreshToken: refresh,
            };
            return token;
          }).catch((err)=>{
            console.log(err);
          });
        }
      }
      
      console.log("nextoken",token);
      if (JwtUtils.isJwtExpired(token.accessToken as string)) {
        const [
          newAccessToken,
          newRefreshToken,
        ] = await NextAuthUtils.refreshToken(token.refreshToken);

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
        }

        return {
          ...token,
          exp: 0,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings);
