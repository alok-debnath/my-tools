export const templateData = {
  loginMail: {
    name: 'WFH login mail',
    subject: 'Log-in Time ({date}) {time}',
    body: `
        Hi HR,
        <br />
        Logged in at {time}.
        <font color='#888888'>
          <br clear='all' />
          <br />
          <span class='gmail_signature_prefix'>-- </span>
          <br />
          <div
            dir='ltr'
            class='gmail_signature'
            data-smartmail='gmail_signature'>
            <div dir='ltr'>
              <div>
                <i>Regards,</i>
              </div>
              <div>
                <font color='#9e9e9e'>
                  <b>Alok Kumar</b>
                </font>
              </div>
              <div>
                <span style='color:#9e9e9eff'>PHP Developer</span>
                <span style='color:rgb(136,136,136)'>
                  <br />
                </span>
              </div>
            </div>
          </div>
        </font>
      `,
  },
  logoutMail: {
    name: 'WFH logout mail',
    subject: 'Logged-out Time ({date}) {time}',
    body: `
        Hi HR,
        <br />
        Logged out at {time}.
        <font color='#888888'>
          <br clear='all' />
          <br />
          <span class='gmail_signature_prefix'>-- </span>
          <br />
          <div
            dir='ltr'
            class='gmail_signature'
            data-smartmail='gmail_signature'>
            <div dir='ltr'>
              <div>
                <i>Regards,</i>
              </div>
              <div>
                <font color='#9e9e9e'>
                  <b>Alok Kumar</b>
                </font>
              </div>
              <div>
                <span style='color:#9e9e9eff'>PHP Developer</span>
                <span style='color:rgb(136,136,136)'>
                  <br />
                </span>
              </div>
            </div>
          </div>
        </font>
      `,
  },
  // Add more templates here
};
