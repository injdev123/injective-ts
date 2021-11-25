import { AccountAddress } from '@injectivelabs/ts-types'
import snakeCaseKeys from 'snakecase-keys'
import { MsgBid } from '@injectivelabs/chain-api/injective/auction/v1beta1/tx_pb'
import { Coin } from '@injectivelabs/chain-api/cosmos/base/v1beta1/coin_pb'

export class AuctionComposer {
  static bid({
    amount,
    round,
    denom = 'inj',
    injectiveAddress,
  }: {
    amount: string
    round: number
    denom?: string
    injectiveAddress: AccountAddress
  }) {
    const coin = new Coin()
    coin.setAmount(amount)
    coin.setDenom(denom)

    const message = new MsgBid()
    message.setBidAmount(coin)
    message.setRound(round)
    message.setSender(injectiveAddress)

    return {
      ...snakeCaseKeys(message.toObject()),
      '@type': '/injective.auction.v1beta1.MsgBid',
    }
  }
}
