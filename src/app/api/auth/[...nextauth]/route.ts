import { getUserInfo } from "@/api/getInfoUser";
import { IUser } from "@/types/IUser";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      console.log("⚡ jwt() callback đang chạy...");
      console.log("Trigger:", trigger);

      // Initial sign in
      if (account) {
        try {
          console.log("🔍 Đang gọi API getUserInfo...");
          const userRes: IUser = await getUserInfo();
          token.user = userRes;
          console.log("✅ Lấy thông tin người dùng thành công:", userRes);
        } catch (error) {
          console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
        }
      }

      // Handle session update
      if (trigger === "update" && session?.user) {
        try {
          console.log("🔄 Đang cập nhật thông tin người dùng...");
          const userRes: IUser = await getUserInfo();
          token.user = userRes;
          console.log("✅ Cập nhật thông tin người dùng thành công:", userRes);
        } catch (error) {
          console.error("❌ Lỗi khi cập nhật thông tin người dùng:", error);
        }
      }

      console.log("🔄 Token sau khi cập nhật:", token);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as IUser;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
