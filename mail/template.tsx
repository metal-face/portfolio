export const template = (firstName: string, formattedDate: string, formattedTime: string) => `
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Meeting Confirmation</title>
      <style>
        /* Responsive and general styles */
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
        /* Media query for responsiveness */
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
      <h1>Meeting Confirmation</h1>
      <p>Hi ${firstName},</p>
      <p>
        This email was automatically sent to confirm that your meeting is scheduled for <strong>${formattedDate}</strong> at <strong>${formattedTime}</strong>.
      </p>
      <p>
        Thank you for scheduling a meeting with me. I look forward to speaking with you.
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
