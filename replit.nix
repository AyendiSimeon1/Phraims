
{ pkgs }: {
  deps = [
    pkgs.openssl.out pkgs.openssl_1_1
         ];  
  env = PRISMA_CLI_QUERY_ENGINE_TYPE = "binary"
}

