#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod openspacesolana {
    use super::*;

  pub fn close(_ctx: Context<CloseOpenspacesolana>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.openspacesolana.count = ctx.accounts.openspacesolana.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.openspacesolana.count = ctx.accounts.openspacesolana.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeOpenspacesolana>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.openspacesolana.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeOpenspacesolana<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Openspacesolana::INIT_SPACE,
  payer = payer
  )]
  pub openspacesolana: Account<'info, Openspacesolana>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseOpenspacesolana<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub openspacesolana: Account<'info, Openspacesolana>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub openspacesolana: Account<'info, Openspacesolana>,
}

#[account]
#[derive(InitSpace)]
pub struct Openspacesolana {
  count: u8,
}
