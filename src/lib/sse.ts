import { SSETraceEvent, AgentNodeName, AgentNodeStatus } from "@/types/agent";

export interface StreamCallbacks {
  onStepStart: (stepId: string, node: AgentNodeName) => void;
  onStepLog: (stepId: string, log: string) => void;
  onStepComplete: (stepId: string, durationMs: number, summary: string) => void;
  onTokenStream: (token: string) => void;
  onRequiresApproval: (approvalData: any) => void;
  onTaskComplete: () => void;
  onError: (error: string) => void;
}

export function simulateAgentTraceStream(
  query: string,
  callbacks: StreamCallbacks
): { abort: () => void } {
  let isAborted = false;

  const runSimulation = async () => {
    try {
      // Step 1: OCR Extraction
      if (isAborted) return;
      callbacks.onStepStart("step-1", "ocr_extract");
      await delay(200);
      callbacks.onStepLog("step-1", "Initializing local PaddleOCR 2.8 engine with CUDA acceleration...");
      await delay(300);
      callbacks.onStepLog("step-1", "Detected 4 Condition Monitoring Location (CML) data rows in hydrocracker_ut_log.pdf.");
      await delay(350);
      callbacks.onStepComplete("step-1", 850, "Extracted 4 CML inspection points (CML-101A through CML-103C).");

      // Step 2: RAG Search
      if (isAborted) return;
      callbacks.onStepStart("step-2", "rag_search");
      await delay(150);
      callbacks.onStepLog("step-2", "Querying ChromaDB vector collection [#Hydrocracker-SOPs, #Piping-API570]...");
      await delay(200);
      callbacks.onStepLog("step-2", "Retrieved API-570 Piping Inspection Code Section 7.1.1 (Cosine similarity: 0.942).");
      await delay(70);
      callbacks.onStepComplete("step-2", 420, "Retrieved 3 grounding SOP chunks with average similarity score 0.93.");

      // Step 3: Industrial Reasoning & Recommendation
      if (isAborted) return;
      callbacks.onStepStart("step-3", "recommend");
      await delay(300);
      callbacks.onStepLog("step-3", "Executing corrosion rate calculations: Long-Term vs Short-Term degradation model...");
      await delay(400);
      callbacks.onStepLog("step-3", "WARNING: CML-HC-101A calculated remaining wall life = 1.58 Years (Breaches 2-year turnaround threshold).");
      await delay(500);
      callbacks.onStepComplete("step-3", 1200, "Corrosion rate 0.82 mm/yr calculated. Critical alert generated for CML-HC-101A.");

      // Stream Tokens into canvas
      const fullResponseText = `### Ultrasonic Thickness (UT) Inspection & Integrity Assessment Report
**Target Equipment:** Hydrocracker Unit 3 (Reactor Overhead Vapor Line 90° Elbow)  
**Standard Cross-Reference:** API 570 / OISD-STD-105 Clause 4.2.1  
**Verification Level:** Sovereign Local Inference (Qwen 2.5 14B Industrial)

---

#### 1. Critical Findings & Wall Thickness Loss Matrix
The localized ultrasonic inspection log was processed through our local multimodal OCR and cross-referenced with baseline inspection records:

| CML Point | Location Description | Nominal (mm) | Measured (mm) | MAWT (mm) | Corrosion Rate | Remaining Life | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CML-HC-101A** | **Reactor Overhead Elbow** | **14.2 mm** | **7.8 mm** | **6.5 mm** | **0.82 mm/yr** | **1.58 Years** | 🚨 **CRITICAL** |
| CML-HC-101B | Effluent Separator Nozzle | 16.0 mm | 11.4 mm | 8.0 mm | 0.45 mm/yr | 7.55 Years | ⚠️ WARNING |
| CML-HC-102A | Recycle Loop Spool | 18.5 mm | 16.9 mm | 9.2 mm | 0.18 mm/yr | 42.7 Years | ✅ NORMAL |
| CML-HC-103C | Sour Gas Reboiler Bottoms | 12.7 mm | 8.1 mm | 7.0 mm | 0.58 mm/yr | 1.89 Years | 🚨 **CRITICAL** |

#### 2. Root Cause Analysis & Degradation Projection
* Point **CML-HC-101A** exhibits accelerated flow-accelerated corrosion (FAC) due to high-velocity multiphase hydrocarbon flow and trace sour $\\text{H}_2\\text{S}$ stream content.
* At the current degradation velocity ($0.82\\text{ mm/year}$), the wall thickness will breach the **Minimum Allowable Wall Thickness (MAWT = 6.5 mm)** by **Q4 2027**, well before the scheduled 2029 major plant turnaround.

#### 3. Prescribed Corrective Action (Pending Engineering Sign-off)
1. Schedule a non-destructive shear-wave phased array ultrasonic testing (PAUT) within 60 days.
2. Fabricate an API 570 Class 1 replacement spool piece (ASTM A335 Grade P22 alloy) for installation during the intermediate October 2026 mini-shutdown.
3. Reduce operating velocity by 8% if reboiler downstream temperature exceeds $310^\\circ\\text{C}$.`;

      const words = fullResponseText.split(" ");
      for (const word of words) {
        if (isAborted) return;
        callbacks.onTokenStream(word + " ");
        await delay(25);
      }

      // Step 4: Human Checkpoint Gate
      if (isAborted) return;
      callbacks.onStepStart("step-4", "human_checkpoint");
      callbacks.onStepLog("step-4", "Safety Critical alert triggered. Halting automated pipeline at Human-in-the-Loop Gate.");
      callbacks.onRequiresApproval({
        criticalPoint: "CML-HC-101A",
        currentThickness: "7.8 mm",
        mawt: "6.5 mm",
        remainingLife: "1.58 Years",
        recommendedAction: "Schedule emergency ASTM A335 P22 replacement spool installation during October 2026 shutdown.",
      });
    } catch (err: any) {
      if (!isAborted) {
        callbacks.onError(err?.message || "Simulation error");
      }
    }
  };

  runSimulation();

  return {
    abort: () => {
      isAborted = true;
    },
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
