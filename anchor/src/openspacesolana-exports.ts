// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import OpenspacesolanaIDL from '../target/idl/openspacesolana.json'
import type { Openspacesolana } from '../target/types/openspacesolana'

// Re-export the generated IDL and type
export { Openspacesolana, OpenspacesolanaIDL }

// The programId is imported from the program IDL.
export const OPENSPACESOLANA_PROGRAM_ID = new PublicKey(OpenspacesolanaIDL.address)

// This is a helper function to get the Openspacesolana Anchor program.
export function getOpenspacesolanaProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...OpenspacesolanaIDL, address: address ? address.toBase58() : OpenspacesolanaIDL.address } as Openspacesolana, provider)
}

// This is a helper function to get the program ID for the Openspacesolana program depending on the cluster.
export function getOpenspacesolanaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Openspacesolana program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return OPENSPACESOLANA_PROGRAM_ID
  }
}
