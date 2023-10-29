export const templateData = {
  loginMail: {
    name: 'WFH login mail',
    subject: 'Log-in Time ({date}) {time}',
    body: `
        Hi HR,
        <br />
        Logged in at {time}.
      `,
  },
  logoutMail: {
    name: 'WFH logout mail',
    subject: 'Logged-out Time ({date}) {time}',
    body: `
        Hi HR,
        <br />
        Logged out at {time}.
      `,
  },
};

export const templateSignature = {
  body: `
      <font color='#888888'>
        <br />
        <br />
        --
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
        </div>
      </font>
  `,
};
