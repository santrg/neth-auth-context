import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@churri.es" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
            console.log("LOGIN REALIZADO")
            console.log(user)
          return user;
        }
        // Return null if user data could not be retrieved
        console.log("FALLO DE LOGIN")
        return null;
      },
    }),
  ],
  pages: {
    signIn: `${process.env.NEXTAUTH_URL}/frontend/login`,
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
