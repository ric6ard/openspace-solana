import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Openspacesolana } from '../target/types/openspacesolana'

describe('openspacesolana', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Openspacesolana as Program<Openspacesolana>

  const openspacesolanaKeypair = Keypair.generate()

  it('Initialize Openspacesolana', async () => {
    await program.methods
      .initialize()
      .accounts({
        openspacesolana: openspacesolanaKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([openspacesolanaKeypair])
      .rpc()

    const currentCount = await program.account.openspacesolana.fetch(openspacesolanaKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Openspacesolana', async () => {
    await program.methods.increment().accounts({ openspacesolana: openspacesolanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.openspacesolana.fetch(openspacesolanaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Openspacesolana Again', async () => {
    await program.methods.increment().accounts({ openspacesolana: openspacesolanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.openspacesolana.fetch(openspacesolanaKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Openspacesolana', async () => {
    await program.methods.decrement().accounts({ openspacesolana: openspacesolanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.openspacesolana.fetch(openspacesolanaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set openspacesolana value', async () => {
    await program.methods.set(42).accounts({ openspacesolana: openspacesolanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.openspacesolana.fetch(openspacesolanaKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the openspacesolana account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        openspacesolana: openspacesolanaKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.openspacesolana.fetchNullable(openspacesolanaKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
