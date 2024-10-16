export const myTemplate = (
    recipientName: string,
    senderName: string,
    senderEmail: string,
    meetingDate: string,
    meetingTime: string,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Meeting Scheduled</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
        color: #333333;
      }
      .container {
        width: 100%;
        table-layout: fixed;
        background-color: #f4f4f4;
        padding: 20px 0;
      }
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 30px;
        border: 1px solid #dddddd;
      }
      h1 {
        color: #333333;
      }
      p {
        line-height: 1.6;
      }
      .footer {
        font-size: 12px;
        color: #777777;
        margin-top: 30px;
        text-align: center;
      }
      @media (max-width: 600px) {
        .wrapper {
          padding: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        <h1>Meeting Scheduled</h1>
        <p>Hi ${recipientName},</p>
        <p>
          A meeting has been scheduled with <strong>${senderName}</strong> 
          (<a href="mailto:${senderEmail}">${senderEmail}</a>).
        </p>
        <p>
          The meeting will take place on <strong>${meetingDate}</strong> at 
          <strong>${meetingTime}</strong>.
        </p>
        <p>
          Please let me know if you need to reschedule or have any further questions.
        </p>
        <p>
          Best regards,<br>
          Bryan Hughes
        </p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Bryan Hughes. All rights reserved.
        </div>
      </div>
    </div>
  </body>
</html>
`;
