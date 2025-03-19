import { getOpenspacesolanaProgram, getOpenspacesolanaProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useOpenspacesolanaProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getOpenspacesolanaProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getOpenspacesolanaProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['openspacesolana', 'all', { cluster }],
    queryFn: () => program.account.openspacesolana.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['openspacesolana', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ openspacesolana: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useOpenspacesolanaProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useOpenspacesolanaProgram()

  const accountQuery = useQuery({
    queryKey: ['openspacesolana', 'fetch', { cluster, account }],
    queryFn: () => program.account.openspacesolana.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['openspacesolana', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ openspacesolana: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['openspacesolana', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ openspacesolana: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['openspacesolana', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ openspacesolana: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['openspacesolana', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ openspacesolana: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
