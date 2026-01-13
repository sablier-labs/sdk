import { sablier } from "@src/index.js";
import { Command } from "commander";

export const chainCmd = new Command("chains")
  .description("List all supported chain slugs")
  .action(() => {
    console.log("🌐 Mainnets:");
    console.log(
      sablier.evm.chains
        .getMainnets()
        .map((c) => `• ${c.slug}`)
        .join("\n"),
    );

    console.log("\n🧪 Testnets:");
    console.log(
      sablier.evm.chains
        .getTestnets()
        .map((c) => `• ${c.slug}`)
        .join("\n"),
    );
  });
