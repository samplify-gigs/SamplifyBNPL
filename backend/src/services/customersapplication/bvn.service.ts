export async function bvnverifyidentity(bvn: string) {
  return {
    status: "successful",
    message: "Bvn lookup was succesful",
    data: {
      session_id: "vivijpbrjgorihporohiirphi",
      methods: [
        {
          method: "email",
          hint: "an email with a verification code will be sent to samp***@gmail.com",
        },
        {
          method: "phone",
          hint: "sms with a verification code will be sent to 090***457758",
        },
      ],
    },
  };
}

export async function verifyMethod(method: string) {
  switch (method) {
    case "email":
      return {
        status: "successful",
        message: "verification",
      };

    case "phone":
      return {
        status: "successful",
        message: "verification",
      };

    default:
      throw new Error("invalid verification method");
  }
}

export async function verifyOtpfromBvn(otp: string) {
  return {
    status: "succesful",
    message: "Bvn details fetched succesfully",
    data: {
      first_name: "Joshua",
      last_name: "Omoniyi",
      nationality: "Nigerian",
      dob: "2020-01-06",
      lga_of_residence: "yaba",
      bvn: 43637673996,
      phone: "080695858584",
    },
  };
}

export async function lookupcredithistoryBvn(bvn: string) {
  const randomCreditScore = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
  return {
    status: "successful",
    message: "Report fetched",
    full_name: "Samuel Jacobs",
    creditscore: 700,
    bank: "Access",
  };
}
