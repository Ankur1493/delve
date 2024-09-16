import Credenitals from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schema"
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"

export default {
  providers: [Credenitals({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordsMatched = await bcrypt.compare(password, user.password);

        if (passwordsMatched)
          return user;
      }
      return null;
    }
  })
  ],
} satisfies NextAuthConfig
