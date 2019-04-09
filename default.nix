{
  pkgs ? import (
    builtins.fetchTarball "https://git.io/zpkgs-archive-master"
  ) { },

  fetchurl ? pkgs.fetchurl,
  fetchgit ? pkgs.fetchgit,

  neofetch ? pkgs.neofetch,
  aha ? pkgs.aha,
  gawk ? pkgs.gawk,
  nix ? pkgs.nix,
  procps ? pkgs.procps,
  e2fsprogs ? pkgs.e2fsprogs,

  nodejs ? pkgs.nodejs,
  mkNpmPackageDerivation ? pkgs.mkNpmPackageDerivation,

  port ? null,
  ...
}:
let
  npmPackage = import ./npm-package.nix { inherit fetchurl fetchgit; };
in mkNpmPackageDerivation (npmPackage // {
  inherit nodejs;
  runtimeInputs = [
    neofetch
    aha
    gawk
    nix
    procps
    e2fsprogs
  ];
  env = {
    PORT = port;
  };
})
