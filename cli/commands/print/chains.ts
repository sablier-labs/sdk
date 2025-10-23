import { sablier } from "@src";
import { Command } from "commander";

export const chainCmd = new Command("chains").description("List all supported chain slugs").action(() => {
  console.log("🌐 Mainnets:");
  console.log(
    sablier.evmChains
      .getMainnets()
      .map((c) => `• ${c.slug}`)
      .join("\n"),
  );

  console.log("\n🧪 Testnets:");
  console.log(
    sablier.evmChains
      .getTestnets()
      .map((c) => `• ${c.slug}`)
      .join("\n"),
  );
});
