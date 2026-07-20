import { Suspense } from "react";
import CustomerApply from "./customerapply";

export default function CustomerApplyPage() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle 600px at 15% 20%, #5A189A55 0%, transparent 70%), radial-gradient(circle 500px at 85% 75%, #9D4EDD30 0%, transparent 65%), linear-gradient(160deg, #10002B 0%, #240046 55%, #0D001A 100%)",
          }}
        >
        
          <div className="w-8 h-8 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
        </main>
      }
    >
      <CustomerApply />
    </Suspense>
  );
}
