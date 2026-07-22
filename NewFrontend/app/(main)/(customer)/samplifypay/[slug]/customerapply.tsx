"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { StepCustomerInfo } from "@/components/customer/customer-verify-page/stepcustomerinfo";
import { StepOtp } from "@/components/customer/customer-verify-page/stepOtp";
import { VerifyMethodModal } from "@/components/customer/customer-verify-page/verifyModalpop";
import { StepBvnDetails } from "@/components/customer/customer-verify-page/stepBvndetails";
import { StepCreditResult } from "@/components/customer/customer-verify-page/stepcreditcheck";
import {
  MobileCard,
  DesktopLeft,
} from "@/components/customer/customer-verify-page/mobile&desktopcards";
import {
  Step,
  CustomerInfo,
  VerifyMethod,
  VerifyOption,
  BvnData,
  CreditData,
} from "@/components/customer/customeruitls/fieldstyles";
import {
  slideVariants,
  slideTransition,
} from "@/components/customer/customeruitls/fieldstyles";
import { useRouter } from "next/navigation";
// ─── Root component ───────────────────────────────────────────────────────────

export default function CustomerApply() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const lastUnderscore = slug.lastIndexOf("_");

  const productFromUrl = slug.slice(0, lastUnderscore).replace(/_/g, " ");
  const id = slug.slice(lastUnderscore + 1);

  const [step, setStep] = useState<Step>(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [info, setInfo] = useState<CustomerInfo>({
    product: productFromUrl,
    bvn: "",
    email: "",
  });

  const [verifyOptions, setVerifyOptions] = useState<VerifyOption[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [bvnData, setBvnData] = useState<BvnData>({
    bvn: "",
    name: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [inputError, setInputError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Show verify modal as an overlay on step 1
  const [showModal, setShowModal] = useState(false);
  const [chosenMethod, setChosenMethod] = useState<VerifyOption | null>(null);

  const [creditData, setCreditData] = useState<CreditData | null>(null);
  const [creditLoading, setCreditLoading] = useState(false);

  function goTo(nextStep: Step) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  // ── Step 0 submit ──────────────────────────────────────────────────────────
  async function submitCustomerInfo() {
    setError("");
    setInputError({});
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvnidentity",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        if (data.errors) setInputError(data.errors);
        return;
      }

      setVerifyOptions(data.data.data.methods);
      setSessionId(data.data.data.sessionId);
      setShowModal(true); // show modal on top of step 0
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step method — option chosen ─────────────────────────────────────────────────
  async function submitVerifyChoice(option: VerifyOption) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvn/method",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            method: option.method,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Failed to send verification.");
        return;
      }

      setChosenMethod(option);
      setShowModal(false);
      goTo(1);
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2 — OTP submit ────────────────────────────────────────────────────
  async function submitOtp(otp: string) {
    setError("");
    setInputError({});
    setLoading(true);
    try {
      const res = await fetch(
        " http://localhost:8080/api/customerbidbvn/customerbvn/otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, otp }),
        },
      );
      const data = await res.json();
      console.log("this data from bvn succefuk opt", data);
      console.log(data.data.data.bvn);

      if (!res.ok) {
        setError(data.message ?? "OTP verification failed.");
        if (data.errors) setInputError(data.errors);
        return;
      }
      setBvnData({
        bvn: data.data.data.bvn,
        name: data.data.data.last_name,
        phone: data.data.data.phone,
      });

      // success
      goTo(2);
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCreditScore() {
    setCreditLoading(true);
    goTo(3); // go to step 3 immediately, show spinner while loading
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvn/creditlookup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bvn: bvnData.bvn }),
        },
      );
      const data = await res.json();
      console.log("this is data from credit:", data);

      if (!res.ok) {
        setError(data.message ?? "Credit check failed.");
        return;
      }

      setCreditData({
        full_name: data.data.full_name,
        creditscore: data.data.creditscore,
        bank: data.data.bank,
      });
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setCreditLoading(false);
    }
  }

  const stepContent = (light?: boolean) => (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        style={{ width: "100%" }}
      >
        {step === 0 && (
          <StepCustomerInfo
            light={light}
            info={info}
            setInfo={setInfo}
            error={error}
            inputError={inputError}
            loading={loading}
            onSubmit={submitCustomerInfo}
          />
        )}
        {step === 1 && (
          <StepOtp
            light={light}
            chosenMethod={chosenMethod}
            error={error}
            inputError={inputError}
            loading={loading}
            onSubmit={submitOtp}
          />
        )}

        {step === 2 && (
          <StepBvnDetails
            light={light}
            bvnData={bvnData}
            onContinue={fetchCreditScore}
          />
        )}

        {step === 3 && (
          <StepCreditResult
            light={light}
            creditData={creditData}
            loading={creditLoading}
            onCheckSpread={() =>
              router.push(
                `/samplifypay/${productFromUrl}/${id}?query=${creditData?.creditscore}`,
              )
            }
          />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-24 lg:py-12 overflow-hidden">
        {/* ── Mobile/Tab ── */}
        <div className="lg:hidden w-full max-w-lg relative">
          <MobileCard>{stepContent(false)}</MobileCard>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden lg:flex w-full max-h-[99vh] max-w-5xl rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/15 overflow-hidden">
          <DesktopLeft />

          <div className="flex-1 bg-white flex flex-col justify-center px-12 py-16 overflow-y-auto overflow-x-hidden relative">
            {stepContent(true)}
          </div>
        </div>
      </main>

      {/* ── Verify method modal (blurred backdrop, rendered above everything) ── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 backdrop-blur-md bg-black/40"
              onClick={() => !loading && setShowModal(false)}
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ pointerEvents: "none" }}
            >
              {/* Mobile modal */}
              <div
                className="w-full max-w-sm rounded-3xl border border-white/20 p-7 flex flex-col lg:hidden bg-[image:var(--bg-gradient)]"
                style={{
                  pointerEvents: "auto",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  boxShadow:
                    "0 24px 80px rgba(90,24,154,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <VerifyMethodModal
                  options={verifyOptions}
                  loading={loading}
                  error={error}
                  onChoose={submitVerifyChoice}
                  light={false}
                />
              </div>

              {/* Desktop modal */}
              <div
                className="hidden lg:flex w-full max-w-md rounded-3xl bg-white p-8 flex-col shadow-[0_24px_80px_rgba(90,24,154,0.3)] border border-purple-200/40"
                style={{ pointerEvents: "auto" }}
              >
                <VerifyMethodModal
                  options={verifyOptions}
                  loading={loading}
                  error={error}
                  onChoose={submitVerifyChoice}
                  light={true}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
