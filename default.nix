{
  pkgs ? import (
    builtins.fetchTarball "https://git.io/zpkgs-archive-master"
  ) { },

  fetchurl ? pkgs.fetchurl,
  fetchgit ? pkgs.fetchgit,
  nodejs ? pkgs.nodejs,
  mkNpmPackageDerivation ? pkgs.mkNpmPackageDerivation,

  port ? 3000,
  ...
}:
let
  npmPackage = import ./npm-package.nix { inherit fetchurl fetchgit; };
in mkNpmPackageDerivation (npmPackage // {
  inherit nodejs;
  env = {
    PORT = port;
  };
})
