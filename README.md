#discord-webhook

## Setup

Setup this code on your  `.github/workflows/` and name it want you want like `discord-push.yml` and push that.
```yml
name: Discord Webhook
on: [push]
jobs:
  Discord_notification:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v1
    - name: Run Discord Webhook
      uses: mrcrypto-gg/discord-webhook@main
      with:
        id: ${{ secrets.DISCORD_WEBHOOK_ID }}
        token: ${{ secrets.DISCORD_WEBHOOK_TOKEN }}
```

You can see the example file at [/.github/workflows/discord-push.yml](/.github/workflows/discord-push.yml)

## Inputs

Setup these inputs on the secrets page on the github repos settings.

```yml
DISCORD_WEBHOOK_ID:
  required: true
  type: string
DISCORD_WEBHOOK_TOKEN:
  required: true
  type: string
```

| `id` | `token` |
|:-----------:|:----------------------------------------------------------:|
| **Required** — This is the id of your Discord webhook, if you copy the webhook url, this will be the first part of it. | **Required** — Your Discord webhook token, it's the second part of the url. |
