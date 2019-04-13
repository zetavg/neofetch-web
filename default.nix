{
  pkgs ? import (
    builtins.fetchTarball "https://git.io/zpkgs-archive-master"
  ) { },

  # writeText ? pkgs.writeText,

  neofetch ? pkgs.neofetch,
  aha ? pkgs.aha,
  gawk ? pkgs.gawk,
  nix ? pkgs.nix,
  procps ? pkgs.procps,
  e2fsprogs ? pkgs.e2fsprogs,

  nodejs ? pkgs.nodejs,
  mkNodePackageWithRuntime ? pkgs.mkNodePackageWithRuntime,

  port ? null,
  neofetchConfigFile ? null, # writeText "neofetch-web-config" '' ''
  customCssFile ? null, # writeText "neofetch-web.css" '' ''
  cacheTimeout ? null, # writeText "neofetch-web.css" '' ''
  ...
}:
let
  npmPackage = import ./npm-package.nix {
    srcs = [
      ./package.json
      ./babel.config.js
      ./src
    ];
  };
in mkNodePackageWithRuntime nodejs {
  buildInputs = [
    neofetch
    aha
    gawk
    nix
    procps
    e2fsprogs
  ];
  environmentVariables = {
    PORT = port;
    NEOFETCH_CONFIG_FILE = neofetchConfigFile;
    CUSTOM_CSS_FILE = customCssFile;
    CACHE_TIMEOUT = cacheTimeout;
  };
} npmPackage
