import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "crypto-js/sha256";

export async function GET() {

  const payEndPoint = "/pg/v1/pay";
  const merchantTransactionId = uniqid();
  const merchantUserId = "nanoid";
  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: merchantUserId,
    amount: 10000,
    redirectUrl: "http://localhost:5173/redirect-u",
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
  const base64CodedPayload = bufferObj.toString("base64");
  const xVerify =
    sha256(base64CodedPayload + payEndPoint + process.env.PHONEPE_SALT_KEY).toString() +
    "###" +
    process.env.PHONEPE_SALT_INDEX;

  const options = {
    method: "post",
    url: `${process.env.PHONEPE_HOST_URL}${payEndPoint}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": xVerify,
    },
    data: {
      request: base64CodedPayload,
    },
  };

  const maxRetries = 3;
  let attempt = 0;
  let response;

  while (attempt < maxRetries) {
    try {
      response = await axios.request(options);
      console.log(response.data);
      return NextResponse.json(response.data);
    } catch (error : any) {
      attempt++;
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt) * 1000;
        console.log(`Rate limit exceeded. Retrying after ${waitTime / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error(error);
        return NextResponse.json({ error: error.message });
      }
    }
  }

  return NextResponse.json({ error: "Max retries exceeded" });
}
