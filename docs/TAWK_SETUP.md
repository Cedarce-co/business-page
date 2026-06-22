# Tawk.to live chat setup

The marketing site uses [Tawk.to](https://www.tawk.to/) for real live chat.

**What we did NOT add:** email transcripts to `support@cedarce.com`. Tawk handles chat in its dashboard. Enable email notifications in Tawk if you want alerts when someone messages.

## 1. Create your Tawk account

1. Sign up at [tawk.to](https://www.tawk.to/).
2. Add a property for **cedarce.com** (or your staging domain).
3. Open **Administration → Channels → Chat Widget**.
4. Copy the embed URL: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`

## 2. Environment variables

```bash
NEXT_PUBLIC_TAWK_PROPERTY_ID=6a387e5f2c206f1d489b8e92
NEXT_PUBLIC_TAWK_WIDGET_ID=1jrmar9fi
```

Restart the dev server after adding vars.

## 3. Brand colors

| Field | Hex |
|-------|-----|
| Widget / header | `#111122` |
| Accent | `#1F3A5F` |

## 4. Collect name + email or phone (guests who are not signed in)

Because the chat UI runs inside Tawk, **name/email/phone are collected in the Tawk dashboard**, not in our site code. This is the right place for anonymous visitors.

When a guest opens chat and tries to send their first message, Tawk’s **Pre-Chat Form** asks for their details **before** the conversation starts (same outcome as “after hello”, but Tawk controls the chat box).

### Setup in Tawk (do this once)

1. **Administration → Channels → Chat Widget** → open your widget  
2. **Pre-Chat Form** tab → **Enable**  
3. Add fields:
   - **Name** → Required  
   - **Email** → Required *(or optional if you prefer phone)*  
   - **Phone** → Required *(or optional if you prefer email)*  
4. **Save**

Use **Name + Email** only, or **Name + Phone** only, or all three — whatever your team needs. At minimum: **name** and **one way to reach them** (email or phone).

Guests cannot send “hello” until they submit the form. Your team then sees their real name in Tawk, not a random ID.

## 5. Notifications and agents

- **Notifications** → email `support@cedarce.com` on new chats  
- **Agents** → invite your team to reply from the Tawk app or dashboard  
- **Offline form** → same fields when no one is online  

## 6. How it works on the site

- Tawk’s widget bubble appears bottom-right.  
- Guests complete Tawk’s pre-chat form before messaging.  
- Homepage **“Chat with our team”** opens the same Tawk window.  

## 7. Optional: remove “Powered by tawk.to”

Tawk charges a small monthly fee to remove their branding.
