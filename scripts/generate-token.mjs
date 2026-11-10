import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Generate a high-entropy 256-bit cryptographic hex token
const token = crypto.randomBytes(32).toString("hex");
const envPath = path.resolve(process.cwd(), ".env");

console.log("\n🔒 Generated Secure Admin Token:\n");
console.log(`   ${token}\n`);

try {
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf-8");
    if (envContent.match(/^ADMIN_TOKEN=.*$/m)) {
      envContent = envContent.replace(/^ADMIN_TOKEN=.*$/m, `ADMIN_TOKEN=${token}`);
      fs.writeFileSync(envPath, envContent, "utf-8");
      console.log("✅ Updated ADMIN_TOKEN in .env\n");
    } else {
      const separator = envContent.endsWith("\n") ? "" : "\n";
      fs.appendFileSync(envPath, `${separator}ADMIN_TOKEN=${token}\n`, "utf-8");
      console.log("✅ Appended ADMIN_TOKEN to .env\n");
    }
  } else {
    fs.writeFileSync(envPath, `ADMIN_TOKEN=${token}\n`, "utf-8");
    console.log("✅ Created .env with ADMIN_TOKEN\n");
  }
} catch (err) {
  console.error("⚠️  Could not automatically write to .env:", err.message);
  console.log("👉 Add this line manually to your .env file:\n");
  console.log(`ADMIN_TOKEN=${token}\n`);
}
