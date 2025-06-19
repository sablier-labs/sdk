import { mainnets, testnets } from "@src/chains";
import { Command } from "commander";
import _ from "lodash";

export const chainCmd = new Command("chains").description("List all supported chain slugs").action(() => {
  console.log("🌐 Mainnets:");
  console.log(
    _.values(mainnets)
      .map((c) => `• ${c.slug}`)
      .join("\n"),
  );

  console.log("\n🧪 Testnets:");
  console.log(
    _.values(testnets)
      .map((c) => `• ${c.slug}`)
      .join("\n"),
  );
});
