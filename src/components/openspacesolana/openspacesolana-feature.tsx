import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useOpenspacesolanaProgram } from './openspacesolana-data-access'
import { OpenspacesolanaCreate, OpenspacesolanaList } from './openspacesolana-ui'

export default function OpenspacesolanaFeature() {
  const { publicKey } = useWallet()
  const { programId } = useOpenspacesolanaProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="Openspacesolana"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <OpenspacesolanaCreate />
      </AppHero>
      <OpenspacesolanaList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
