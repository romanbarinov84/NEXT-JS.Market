import VerifyEmail from "@/app/(auth)/(registration)/_components/VerifyEmail";
import { betterAuth} from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { phoneNumber } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db("deliveryShop");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Галя Балуванна <onboarding@resend.dev>",
        to: user.email,
        subject: "Подтвердите email",
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    autoSignInAfterVerification: false,
    expiresIn: 3600,
  },

  plugins: [
    phoneNumber({
       sendOTP: async ({ phoneNumber, code }) => {
        console.log(`[DEBUG] Отправка OTP: ${code} для ${phoneNumber}`)
       },
     /* sendOTP: async ({ phoneNumber, code }) => {
        try {
          const token = process.env.SMS_API_KEY;
          const url = "https://im.smsclub.mobi/sms/send";

          const data = {
            phone: [phoneNumber], // номер получателя
            message: `Ваш код подтверждения: ${code}`, // OTP
            src_addr: "Галя Балувана", // имя отправителя
          };

          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          if(result.status !== "OK"){
            throw new Error(result.status || "Ошибка отправки SMS")
          }
          
        } catch (error) {
          console.error("Ошибка отправки SMS:", error);
          throw new Error("Не удалось отправить OTP");
        }
      },*/
      /*signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@deliveryShop.ua`
                },
               
                getTempName: (phoneNumber) => {
                    return phoneNumber 
                }
            },*/
            allowedAttempts: 3,
             otpLength: 4,
            expiresIn: 300,
            requireVerification:true,
    }),
  ],
  user: {
    additionalFields: {
      phoneNumber: { type: "string", input: true, required: true },
      surName: { type: "string", input: true, required: true },
      birthdayDate: { type: "date", input: true, required: true },
      region: { type: "string", input: true, required: true },
      location: { type: "string", input: true, required: true },
      card: { type: "string", input: true, required: false },
      hasCard: { type: "boolean", input: true, required: false },
    },
  },
});
