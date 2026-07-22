"use client";

import React, { useState, useReducer } from "react";
import {
  ErrorBanner,
  FieldError,
  SuccessToast,
} from "@/components/Merchant/error-success-feedback/feedback";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeOffIcon,
} from "@/components/Merchant/eyeIconPassword/eyeIcon";

type Data = {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  productCategory: string;
  location: string;
  fullAddress: string;
  primaryNumber: string;
  secondaryPhone: string;
};

type InputChangeAction = {
  type: "INPUT_DATA";
  payload: {
    name: string;
    value: string;
  };
};

type FormAction = InputChangeAction;

const inistialState: Data = {
  businessName: "",
  email: "",
  password: "",
  confirmPassword: "",
  productCategory: "",
  location: "",
  fullAddress: "",
  primaryNumber: "",
  secondaryPhone: "",
};

function reducer(state: Data, action: FormAction) {
  switch (action.type) {
    case "INPUT_DATA":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
  }

  return state;
}

type FormFieldsProps = {
  light?: boolean;
  inputsData: Data;
  dispatch: React.Dispatch<InputChangeAction>;
  inputError: Record<string, string>;
};

export default function MerchantSignup() {
  const [inputsData, dispatch] = useReducer(reducer, inistialState);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function SendinputsData() {
    setInputError({});
    setError("");

    if (inputsData.password !== inputsData.confirmPassword) {
      setInputError({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/merchant/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputsData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        if (data.errors) {
          setInputError(data.errors);
        }
      } else {
        setSuccess(data.message);
        router.push("/merchantverifyemail");
      }
    } catch (err) {
      console.error(`error sending the inputs: ${err}`);
      setError("unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-24 lg:py-12  ">
      <SuccessToast message={success} onDismiss={() => setSuccess("")} />
      {/* ── Mobile/Tab: single glassy card ── */}

      <div className="lg:hidden w-full max-w-lg ">
        <div
          className="w-full rounded-3xl border max-h-[95vh] overflow-y-auto border-white/20 p-8 flex flex-col gap-5 bg-[image:var(--bg-gradient)] "
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-1">
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-widest">
              Samplify for Business
            </span>
            <h1 className="text-white text-2xl font-bold leading-tight">
              Get started as a Merchant
            </h1>
            <p className="text-white/50 text-sm">
              List your products and reach customers who pay on flexible plans.
            </p>
          </div>

          <ErrorBanner message={error} />

          <FormFields
            inputsData={inputsData}
            dispatch={dispatch}
            inputError={inputError}
          />

          <button
            onClick={SendinputsData}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200"
          >
            {loading ? "Registering..." : "Register with Samplify"}
          </button>

          <p className="text-center text-white/40 text-xs">
            Already have an account?{" "}
            <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors">
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* ── Desktop: split card ── */}
      <div className="hidden lg:flex w-full max-h-[99vh] max-w-5xl rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/15  overflow-hidden">
        {/* LEFT — gradient panel */}
        <div
          className="w-[42%] flex-shrink-0 relative flex flex-col justify-between p-10"
          style={{
            background:
              "radial-gradient(circle 500px at 30% 30%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 400px at 80% 80%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
          }}
        >
          {/* Decorative orb blur */}
          <div className="absolute top-12 right-0 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

          {/* Top mark */}
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">✦</span>
          </div>

          {/* Bottom copy */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">
                For merchants
              </span>
              <h2 className="text-white text-3xl font-bold leading-snug">
                Sell more.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF]">
                  Get paid faster.
                </span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Join thousands of vendors offering flexible payment plans. Reach
              customers who are ready to buy — on terms that work for everyone.
            </p>

            {/* Mini stats */}
            <div className="flex gap-6 pt-2">
              <div>
                <p className="text-white font-bold text-xl">
                  3.2K<span className="text-purple-400">+</span>
                </p>
                <p className="text-white/40 text-xs">Merchants onboard</p>
              </div>
              <div>
                <p className="text-white font-bold text-xl">
                  1.5M<span className="text-purple-400">+</span>
                </p>
                <p className="text-white/40 text-xs">Active customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12 gap-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
              New merchant
            </span>
            <h1 className="text-[#10002B] text-2xl font-bold">
              Create your store
            </h1>
            <p className="text-gray-400 text-sm">
              Fill in your business details to get listed on Samplify.
            </p>
          </div>
          <ErrorBanner message={error} light />
          <FormFields
            light
            inputsData={inputsData}
            dispatch={dispatch}
            inputError={inputError}
          />

          <button
            onClick={SendinputsData}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200"
          >
            {loading ? "Registering..." : "Register with Samplify"}
          </button>

          <p className="text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <span className="text-[#7B2FBE] hover:text-[#9D4EDD] cursor-pointer font-medium transition-colors">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}

// Shared form fields — dark=glass mode, light=white bg mode
function FormFields({
  light,
  inputsData,
  dispatch,
  inputError,
}: FormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    dispatch({
      type: "INPUT_DATA",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };
  const input = (hasError: boolean) =>
    light
      ? `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
          hasError
            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
            : "border-gray-200 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60"
        }`
      : `w-full px-4 py-2.5 rounded-xl border bg-white/[0.07] text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 transition-all backdrop-blur-sm ${
          hasError
            ? "border-red-400/40 focus:ring-red-400/20"
            : "border-white/10 focus:ring-purple-400/30 focus:border-purple-400/30"
        }`;

  const label = light
    ? "text-gray-700 text-xs font-medium mb-1 block"
    : "text-white/60 text-xs font-medium mb-1 block";
  const select = light
    ? "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60 transition-all appearance-none"
    : "w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.07] text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none backdrop-blur-sm";

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Business name</label>
          <input
            className={input(!!inputError.businessName)}
            placeholder="e.g. TechZone Stores"
            type="text"
            name="businessName"
            value={inputsData.businessName}
            onChange={handleChange}
          />
          <FieldError message={inputError.businessName} />
        </div>
        <div>
          <label className={label}>Email address</label>
          <input
            className={input(!!inputError.email)}
            placeholder="you@business.com"
            type="email"
            name="email"
            value={inputsData.email}
            onChange={handleChange}
          />
          <FieldError message={inputError.email} />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className={label}>Password</label>
        <div className="relative">
          <input
            className={`${input(!!inputError.password)} pr-11`}
            placeholder="Create a password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputsData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              light
                ? "text-gray-400 hover:text-gray-600"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <FieldError message={inputError.password} />
      </div>

      {/* Confirm Password */}
      <div>
        <label className={label}>Confirm password</label>
        <div className="relative">
          <input
            className={`${input(!!inputError.confirmPassword)} pr-11`}
            placeholder="Re-enter your password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={inputsData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((p) => !p)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              light
                ? "text-gray-400 hover:text-gray-600"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <FieldError message={inputError.confirmPassword} />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Product category</label>
          <select
            className={select}
            value={inputsData.productCategory}
            name="productCategory"
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option>Furniture</option>
            <option>Fashion</option>
            <option>Gadgets</option>
            <option>Electronics</option>
          </select>
          <FieldError message={inputError.productCategory} />
        </div>

        <div>
          <label className={label}>Location</label>
          <select
            className={select}
            value={inputsData.location}
            name="location"
            onChange={handleChange}
          >
            <option value="">Select state</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Ogun</option>
            <option>Port Harcourt</option>
            <option>Calabar</option>
          </select>
          <FieldError message={inputError.location} />
        </div>
      </div>

      {/* Full address */}
      <div>
        <label className={label}>Full address</label>
        <textarea
          rows={2}
          placeholder="Shop address, street, city"
          className={`${input(!!inputError.fullAddress)} resize-none`}
          value={inputsData.fullAddress}
          name="fullAddress"
          onChange={handleChange}
        />
        <FieldError message={inputError.fullAddress} />
      </div>

      {/* Row 3 — phones */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>WhatsApp / Primary</label>
          <input
            className={input(!!inputError.primaryNumber)}
            placeholder="+234 800 000 0000"
            type="tel"
            name="primaryNumber"
            value={inputsData.primaryNumber}
            onChange={handleChange}
          />
          <FieldError message={inputError.primaryNumber} />
        </div>
        <div>
          <label className={label}>Secondary line</label>
          <input
            className={input(!!inputError.secondaryPhone)}
            placeholder="+234 800 000 0001"
            type="tel"
            name="secondaryPhone"
            value={inputsData.secondaryPhone}
            onChange={handleChange}
          />
          <FieldError message={inputError.secondaryPhone} />
        </div>
      </div>
    </div>
  );
}
