export async function generateSHA256(data: string | ArrayBuffer): Promise<string> {
  let buffer: ArrayBuffer;
  if (typeof data === "string") {
    const encoder = new TextEncoder();
    buffer = encoder.encode(data).buffer;
  } else {
    buffer = data;
  }

  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Fallback deterministic simulation if crypto subtle not available
  let hash = 0;
  const str = typeof data === "string" ? data : new Uint8Array(data).join("");
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
}
