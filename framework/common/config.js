const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_FW = ["shopify", "saleor", "shopify_local"];
const FALLBACK_FW = "shopify";

function withFrameworkConfig(defaultConfig = {}) {
  let framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error("No framework name provided");
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error(
      `Framework ${framework} is not supported. Allowed: ${ALLOWED_FW.join(
        ", "
      )}`
    );
  }

  if (framework === "shopify_local") {
    framework = FALLBACK_FW;
  }

  const frameworkStoreConfig = require(path.join(
    "../",
    framework,
    "store.config"
  ));
  const config = merge(defaultConfig, frameworkStoreConfig);

  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath);
  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];
  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), { parser: "json" })
  );
  return config;
}

module.exports = { withFrameworkConfig };
