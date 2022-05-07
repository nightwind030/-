#  <img src="/readme/thumbnail.png" style="width: 32px; border-radius: 8px;"> Emoji Giveaway
This is a simple emoji giveaway for your Discord server.

It creates a `/giveaway <time> <prize>` slash command which users can react to so they'll be in draw to win the prize. Once the time is up a random winner will be selected and notified.

---

# Configuration

## Giveaway winner timing

Currently this app checks for a winner every 5 minutes.

If you'd like to change this you can update the `scheduler/xminutely.js` file to check as often as every 1 minute.
Just note that this will use ~43k requests a month against your account (vs ~8k every 5 minutes).

Regardless of the 5 minute winner check, the `<time>` argument works for any number of seconds. Users who react after the giveaway ends will not be added to the prize draw, the winer will just not be notified until the next 5 minute check.